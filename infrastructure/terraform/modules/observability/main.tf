# Observability Module: OpenTelemetry Collector, Prometheus, CloudWatch
variable "environment" { type = string }

output "otel_collector_endpoint" { value = "otel-collector.${var.environment}.internal:4317" }
output "prometheus_endpoint" { value = "prometheus.${var.environment}.internal:9090" }
