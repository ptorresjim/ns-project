FROM python:3.6-alpine

RUN adduser -D project

WORKDIR /home/env

COPY requirements.txt requirements.txt
RUN apk add --update nodejs nodejs-npm
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app
#COPY migrations migrations
COPY static/src static/src
COPY static/build static/build
COPY static/dist static/dist
COPY static/public static/public
COPY static/package.json static/package.json
COPY project.py config.py boot.sh .flaskenv ./
RUN chmod +x boot.sh

RUN npm install -g pm2

WORKDIR /home/env/static
RUN npm install
RUN npm run build

WORKDIR /home/env

ENV FLASK_APP project.py

RUN chown -R project:project ./
USER project

EXPOSE 5000 3000
CMD ["./boot.sh"]