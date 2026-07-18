module "frontend_cdn" {
  source = "./modules/frontend-cdn"

  env            = var.env
  domain         = var.primary_domain
  aws_account_id = data.aws_caller_identity.current.account_id

  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }
}

module "redirect_cdn" {
  source = "./modules/redirect-cdn"
  count  = var.redirect_domain != "" ? 1 : 0

  env             = var.env
  redirect_domain = var.redirect_domain
  primary_domain  = var.primary_domain

  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }
}

data "aws_caller_identity" "current" {}
