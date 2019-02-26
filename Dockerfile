FROM python:3.6-alpine

RUN adduser -D project

WORKDIR /home/env

COPY requirements.txt requirements.txt
RUN apk add --update nodejs nodejs-npm
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app
COPY static/build static/build
COPY project.py config.py boot.sh .flaskenv ./
RUN chmod +x boot.sh


WORKDIR /home/env

ENV FLASK_APP project.py
RUN chown -R project:project ./
USER project

EXPOSE 5000 3000

WORKDIR /home/env/static
RUN python -m http.server 3000 &

WORKDIR /home/env
CMD ["./boot.sh"]
