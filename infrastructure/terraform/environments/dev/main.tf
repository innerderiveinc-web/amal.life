# Development Environment Root
module "network" {
  source      = "../../modules/network"
  environment = "dev"
}

module "kubernetes" {
  source      = "../../modules/kubernetes"
  environment = "dev"
}

module "postgres" {
  source      = "../../modules/postgres"
  environment = "dev"
}

module "redis" {
  source      = "../../modules/redis"
  environment = "dev"
}

module "storage" {
  source      = "../../modules/storage"
  environment = "dev"
}

module "observability" {
  source      = "../../modules/observability"
  environment = "dev"
}

module "secrets" {
  source      = "../../modules/secrets"
  environment = "dev"
}
