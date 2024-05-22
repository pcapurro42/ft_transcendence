#!/bin/bash
python3 manage.py migrate
gunicorn -c gunicorn_config.py signalingserv.wsgi
