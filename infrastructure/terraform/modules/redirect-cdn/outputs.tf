output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.redirect.id
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.redirect.domain_name
}
