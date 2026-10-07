# Production Environment Root
module "network" {
  source      = "../../modules/network"
  environment = "prod"
}

module "kubernetes" {
  source      = "../../modules/kubernetes"
  environment = "prod"
}

module "postgres" {
  source      = "../../modules/postgres"
  environment = "prod"
}

module "redis" {
  source      = "../../modules/redis"
  environment = "prod"
}

module "storage" {
  source      = "../../modules/storage"
  environment = "prod"
}

module "observability" {
  source      = "../../modules/observability"
  environment = "prod"
}

module "secrets" {
  source      = "../../modules/secrets"
  environment = "prod"
}
