#!/bin/bash

sed -i "s|__B64_ClientID_ClientSecret__|$B64_ClientID_ClientSecret|g" /etc/nginx/conf.d/nginx.conf
sed -i "s|hostname|$HOSTNAME|g" /etc/nginx/conf.d/nginx.conf

nginx -g 'daemon off;'
