#!/bin/sh
source venv/bin/activate
flask db upgrade
flask translate compile
exec npm run start &
exec gunicorn -b :5000 --access-logfile - --error-logfile - project:app