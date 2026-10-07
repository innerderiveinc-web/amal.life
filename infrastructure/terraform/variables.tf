variable "aws_region" {
  description = "AWS production deployment region"
  type        = string
  default     = "eu-central-1" # Frankfurt primary
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}
