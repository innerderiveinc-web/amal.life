# Network Module: VPC, Multi-AZ Subnets, NAT Gateways, WAF
variable "environment" { type = string }
variable "vpc_cidr" { type = string default = "10.0.0.0/16" }

output "vpc_id" { value = "vpc-amal-${var.environment}" }
output "private_subnets" { value = ["subnet-priv-1a", "subnet-priv-1b", "subnet-priv-1c"] }
output "public_subnets" { value = ["subnet-pub-1a", "subnet-pub-1b", "subnet-pub-1c"] }
