# AMAL OS — ROOT MAKEFILE (Section 98)
.PHONY: up down migrate seed test verify reset dev clean

up:
	docker compose up -d

down:
	docker compose down

migrate:
	pnpm db:migrate

seed:
	pnpm db:seed

test:
	pnpm test

verify:
	pnpm verify

reset:
	pnpm db:reset

dev:
	pnpm dev

clean:
	rm -rf node_modules dist .turbo
