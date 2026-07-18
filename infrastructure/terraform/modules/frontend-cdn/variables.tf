variable "env" {
  type = string
}

variable "domain" {
  type        = string
  description = "Primary domain (e.g. nickscherer.com)"
}

variable "aws_account_id" {
  type = string
}
