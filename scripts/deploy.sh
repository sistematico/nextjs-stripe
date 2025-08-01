#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin
TEMP_DIR=/tmp/stripe.lucasbrum.dev
PROJECT_DIR=/var/www/stripe.lucasbrum.dev

rm -rf "$TEMP_DIR"
cp -a "$PROJECT_DIR" "$TEMP_DIR"

cd "$TEMP_DIR" || exit 1

git clean -fxd -e .env.production
cp .env.production .env
sudo /usr/bin/systemctl stop stripe.lucasbrum.dev.service
bun install
bun run db:reset
bun run db:push
bun run db:seed
bun run build

rm -rf "$PROJECT_DIR"
cp -a "$TEMP_DIR" "$PROJECT_DIR"

sudo /usr/bin/systemctl start stripe.lucasbrum.dev.service