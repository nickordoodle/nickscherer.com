variable "env" {
  type = string
}

variable "redirect_domain" {
  type        = string
  description = "Domain to redirect FROM (e.g. nickscherer.io)"
}

variable "primary_domain" {
  type        = string
  description = "Domain to redirect TO (e.g. nickscherer.com)"
}
