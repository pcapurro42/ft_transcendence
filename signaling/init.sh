#!/bin/bash

sed -i "s|hostname|$HOSTNAME|g" /app/signaling-server/settings.py
sed -i "s|hostname|$HOSTNAME|g" /app/signaling-server/views.py

python3 manage.py migrate

gunicorn -c gunicorn_config.py signaling-server.wsgi