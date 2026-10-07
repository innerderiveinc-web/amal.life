# PostgreSQL Module: RDS Multi-AZ PostgreSQL 16+ with pgvector & PgBouncer
variable "environment" { type = string }
variable "instance_class" { type = string default = "db.r6g.xlarge" }

output "db_endpoint" { value = "postgres-primary.${var.environment}.internal:5432" }
output "pgbouncer_endpoint" { value = "pgbouncer.${var.environment}.internal:6432" }
output "database_name" { value = "amal_os_${var.environment}" }
