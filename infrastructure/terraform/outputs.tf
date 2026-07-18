output "frontend_bucket" {
  description = "S3 bucket name for frontend assets"
  value       = module.frontend_cdn.bucket_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (use for cache invalidation)"
  value       = module.frontend_cdn.cloudfront_distribution_id
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain"
  value       = module.frontend_cdn.cloudfront_domain
}
