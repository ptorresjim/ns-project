#!/bin/sh
source venv/bin/activate
flask db init
flask db migrate
flask db upgrade
flask translate compile
exec npm run start &
exec gunicorn --bind 0.0.0.0:5000 --access-logfile - --error-logfile - project:app