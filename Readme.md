# Post CMS

## Overview

## Documentation

## Environment variables

## Run

### Makefile

Запуск комманд производится из корневой папки проекта.

- `make up` - запуск сервисов (включает в себя проверку конфигурации)
- `make down` - остановка сервисов
- `make restart` - перезапуск сервисов
- `make dev` - запустить одноразовій контейнер с сервисом remix
- `make sh` - запустить шелл в контейнере с сервисом remix

### Without Makefile

```shellscript
docker-compose --env-file .env -f ./docker/local/docker-compose.yml up -d
```

Then open a brower: http://localhost:8080/

### Run migrations

First instal dotenv-cli globally:

```
npm install -g dotenv-cli
```

Then from the _source directory_ run command for migrations (after generation):

```
dotenv -e ../.env -- npx prisma migrate dev --name <migration-name>
```

## Notes

- Папка `docker/local` находится в `.gitignore` и может содержать конфигурацию для локальной среды разработки
- Текущий проект настроен на работу с `stage` окружением.

```

```
