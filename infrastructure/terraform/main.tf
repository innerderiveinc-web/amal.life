terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# PostgreSQL with pgvector
resource "aws_db_instance" "amal_postgres" {
  identifier           = "amal-os-db-production"
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.r6g.xlarge"
  allocated_storage    = 100
  max_allocated_storage = 500
  storage_type         = "gp3"
  multi_az             = true
  publicly_accessible  = false
  deletion_protection  = true
  skip_final_snapshot  = false
  final_snapshot_identifier = "amal-db-final-snapshot"
  backup_retention_period = 30
}

# Redis cluster for BullMQ queues
resource "aws_elasticache_cluster" "amal_redis" {
  cluster_id           = "amal-os-redis-production"
  engine               = "redis"
  node_type            = "cache.m6g.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}

# S3 Bucket for Canonical Islamic Evidence & Audits
resource "aws_s3_bucket" "amal_evidence_store" {
  bucket        = "amal-os-evidence-vault-prod"
  force_destroy = false
}

resource "aws_s3_bucket_versioning" "amal_evidence_versioning" {
  bucket = aws_s3_bucket.amal_evidence_store.id
  versioning_configuration {
    status = "Enabled"
  }
}
