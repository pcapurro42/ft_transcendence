#!/bin/bash

sed -i "s|hostname|$HOSTNAME|g" /app/signalingserv/settings.py
sed -i "s|hostname|$HOSTNAME|g" /app/signalingserv/views.py

cat /app/signalingserv/settings.py
cat /app/signalingserv/views.py

python3 manage.py migrate

gunicorn -c gunicorn_config.py signalingserv.wsgi