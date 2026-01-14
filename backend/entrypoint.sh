#!/bin/sh
set -e

echo "Waiting for database..."

until alembic current >/dev/null 2>&1; do
  sleep 2
done

echo "Running database migrations..."
alembic upgrade head

echo "Starting FastAPI..."
exec "$@"
