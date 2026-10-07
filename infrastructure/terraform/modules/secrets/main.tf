# Secrets Module: KMS Master Key, Secrets Manager Vault
variable "environment" { type = string }

output "kms_key_arn" { value = "arn:aws:kms:eu-west-1:123456789012:key/amal-kms-${var.environment}" }
output "secrets_vault_arn" { value = "arn:aws:secretsmanager:eu-west-1:123456789012:secret:amal-vault-${var.environment}" }
