#!/usr/bin/make

include .env

.DEFAULT_GOAL := help
docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(docker_bin) compose
PROJECT_NAME := post_cms_$(ENVIRONMENT)

COMPOSE_CONFIG := --env-file .env -p $(PROJECT_NAME) -f ./docker/$(ENVIRONMENT)/docker-compose.yml

MAIN_DATABASE_VOLUME := post-cms-db-data-$(ENVIRONMENT)

REMIX_SERVICE := post-cms-remix-$(ENVIRONMENT)

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

---------------: ## ------[ DOCKER ]---------
docker-clean:
	$(docker_bin) image prune -a --force --filter "label=post-cms-$(ENVIRONMENT)"

---------------: ## ------[ BASE ACTIONS ]---------
volume-create:
	$(docker_bin) volume create $(MAIN_DATABASE_VOLUME) || true
check: volume-create
	$(docker_compose_bin) $(COMPOSE_CONFIG) config
up: check
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d
	$(docker_compose_bin) $(COMPOSE_CONFIG) up $(REMIX_SERVICE) -d --force-recreate
up-dev: check
	$(docker_compose_bin) $(COMPOSE_CONFIG) up
up-recreate: check
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d --force-recreate --build
up-recreate-dev: check
	$(docker_compose_bin) $(COMPOSE_CONFIG) up --force-recreate --build
down:
	$(docker_compose_bin) $(COMPOSE_CONFIG) down $(REMIX_SERVICE)
restart:
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart
down-all:
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
up-all: check
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d --force-recreate

---------------: ## ------[ COMMANDS ]---------
---------------: ## ------[ Remix ]---------
dev:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(REMIX_SERVICE) || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(REMIX_SERVICE) bash || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(REMIX_SERVICE) || true
sh:
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec $(REMIX_SERVICE) bash
