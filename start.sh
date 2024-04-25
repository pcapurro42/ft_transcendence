#!/bin/bash
sed -i "s|_CLIENT_SECRET_}|$CLIENT_SECRET|g" /etc/nginx/conf.d/nginx.conf
nginx -g 'daemon off;'
