#!/bin/bash

sed -i "s|hostname|$HOSTNAME|g" /etc/nginx/conf.d/nginx.conf

sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Menu/auth.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/answer.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/offer.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/init.js

nginx -g 'daemon off;'