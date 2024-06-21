#!/bin/bash

sed -i "s|hostname|$HOSTNAME|g" /app/gunicorn_config.py
sed -i "s|hostname|$HOSTNAME|g" /app/signaling-server/settings.py
sed -i "s|hostname|$HOSTNAME|g" /app/signaling-server/views.py

django-admin startapp signaling
python3 manage.py makemigrations signaling
python3 manage.py migrate
gunicorn -c gunicorn_config.py signaling-server.wsgi
