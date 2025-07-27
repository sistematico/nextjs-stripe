#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

git clean -fxd -e .env.production
cp .env.production .env
sudo /usr/bin/systemctl stop auth.lucasbrum.dev.service
bun install
bun run db:reset
bun run db:push
bun run db:seed
bun run build
sudo /usr/bin/systemctl start auth.lucasbrum.dev.service