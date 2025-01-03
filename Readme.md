# Post CMS

## Overview

## Documentation

### Installation

Install the dependencies from the _source_ directory:

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env` and provide a all variables with your values.

### Run migrations

A command below lets you generate SQL migrations based on you Drizzle schema (from the source directory):

```bash
npm run db:generate
```

Run an initial database migration:

```bash
npm run db:migrate
```

## Run With Makefile

Запуск комманд производится из корневой папки проекта.

- `make up` - запуск сервисов (включает в себя проверку конфигурации)
- `make down` - остановка сервисов
- `make restart` - перезапуск сервисов
- `make dev` - запустить одноразовій контейнер с сервисом remix
- `make sh` - запустить шелл в контейнере с сервисом remix

## Run Without Makefile

### Development

Start the DataBase with docker by command above from the root directory:

```bash
docker-compose --env-file .env -f ./docker/local/docker-compose.yml up -d
```

Then open a browser: `http://localhost:8080`

Enter the PGADMIN_DEFAULT_EMAIL environment variable as email
and PGADMIN_DEFAULT_PASSWORD environment variable as password

Start the development server with HMR from the _source_ directory:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Notes

- The folder `docker/local` is located in `.gitignore` and can contain configuration for the local development environment
- The current project is configured to work with `stage` environment.

```

```
