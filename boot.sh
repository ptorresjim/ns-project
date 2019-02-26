#!/bin/sh

source venv/bin/activate
flask db init
flask db migrate
flask db upgrade
flask translate compile
exec gunicorn --bind 0.0.0.0:5000 --bind 0.0.0.0:3000 --access-logfile - --error-logfile - project:app