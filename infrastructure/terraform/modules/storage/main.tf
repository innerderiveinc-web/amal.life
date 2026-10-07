# Storage Module: 4 Isolated S3 Buckets with KMS Encryption & Versioning
variable "environment" { type = string }

output "public_assets_bucket" { value = "amal-public-assets-${var.environment}" }
output "private_user_data_bucket" { value = "amal-private-user-data-${var.environment}" }
output "evidence_artifacts_bucket" { value = "amal-evidence-artifacts-${var.environment}" }
output "audit_archives_bucket" { value = "amal-audit-archives-${var.environment}" }
