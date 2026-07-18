terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = "~> 5.0"
      configuration_aliases = [aws.us_east_1]
    }
  }
}

# ─── S3 bucket for redirect ───────────────────────────────────────────────────

resource "aws_s3_bucket" "redirect" {
  bucket = "nickscherer-redirect-${var.env}-${replace(var.redirect_domain, ".", "-")}"

  tags = {
    Name        = "redirect-${var.redirect_domain}"
    Environment = var.env
  }
}

resource "aws_s3_bucket_website_configuration" "redirect" {
  bucket = aws_s3_bucket.redirect.id

  redirect_all_requests_to {
    host_name = var.primary_domain
    protocol  = "https"
  }
}

resource "aws_s3_bucket_public_access_block" "redirect" {
  bucket = aws_s3_bucket.redirect.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "redirect" {
  bucket = aws_s3_bucket.redirect.id
  acl    = "public-read"

  depends_on = [aws_s3_bucket_public_access_block.redirect]
}

# ─── ACM cert for redirect domain ────────────────────────────────────────────

resource "aws_acm_certificate" "redirect" {
  provider          = aws.us_east_1
  domain_name       = var.redirect_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# ─── CloudFront for redirect ──────────────────────────────────────────────────

resource "aws_cloudfront_distribution" "redirect" {
  enabled     = true
  aliases     = [var.redirect_domain]
  price_class = "PriceClass_100"
  comment     = "Redirect ${var.redirect_domain} → ${var.primary_domain}"

  origin {
    domain_name = aws_s3_bucket_website_configuration.redirect.website_endpoint
    origin_id   = "S3-redirect-${var.redirect_domain}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-redirect-${var.redirect_domain}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.redirect.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name        = "redirect-${var.redirect_domain}"
    Environment = var.env
  }
}

# ─── Route53 for redirect domain ─────────────────────────────────────────────

data "aws_route53_zone" "redirect" {
  name         = var.redirect_domain
  private_zone = false
}

resource "aws_route53_record" "redirect_apex" {
  zone_id = data.aws_route53_zone.redirect.zone_id
  name    = var.redirect_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.redirect.domain_name
    zone_id                = aws_cloudfront_distribution.redirect.hosted_zone_id
    evaluate_target_health = false
  }
}
