variable "aws_region" {
  description = "Primary AWS region"
  type        = string
  default     = "us-east-1"
}

variable "env" {
  description = "Deployment environment"
  type        = string
}

variable "primary_domain" {
  description = "Primary domain (e.g. nickscherer.com)"
  type        = string
}

variable "redirect_domain" {
  description = "Domain to redirect to primary (e.g. nickscherer.io)"
  type        = string
  default     = ""
}
