# Staging Environment Root
module "network" {
  source      = "../../modules/network"
  environment = "staging"
}

module "kubernetes" {
  source      = "../../modules/kubernetes"
  environment = "staging"
}

module "postgres" {
  source      = "../../modules/postgres"
  environment = "staging"
}

module "redis" {
  source      = "../../modules/redis"
  environment = "staging"
}

module "storage" {
  source      = "../../modules/storage"
  environment = "staging"
}

module "observability" {
  source      = "../../modules/observability"
  environment = "staging"
}

module "secrets" {
  source      = "../../modules/secrets"
  environment = "staging"
}
