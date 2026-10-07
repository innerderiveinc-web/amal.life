# Redis Module: ElastiCache Redis 7 Cluster with BullMQ Persistence
variable "environment" { type = string }

output "redis_primary_endpoint" { value = "redis-cluster.${var.environment}.internal:6379" }
output "redis_read_endpoint" { value = "redis-ro.${var.environment}.internal:6379" }
