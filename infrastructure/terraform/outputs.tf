output "postgres_endpoint" {
  description = "Database connection endpoint"
  value       = aws_db_instance.amal_postgres.endpoint
  sensitive   = true
}

output "redis_endpoint" {
  description = "Redis cache and queue endpoint"
  value       = aws_elasticache_cluster.amal_redis.cache_nodes[0].address
}

output "evidence_bucket" {
  description = "S3 evidence store bucket name"
  value       = aws_s3_bucket.amal_evidence_store.bucket
}
