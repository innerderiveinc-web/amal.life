# Kubernetes / EKS Module: Multi-AZ Node Groups, Topology Spreading, OIDC
variable "environment" { type = string }
variable "cluster_version" { type = string default = "1.30" }

output "cluster_name" { value = "amal-eks-${var.environment}" }
output "cluster_endpoint" { value = "https://eks.amal-${var.environment}.internal" }
output "oidc_provider_arn" { value = "arn:aws:iam::123456789012:oidc-provider/eks-amal-${var.environment}" }
