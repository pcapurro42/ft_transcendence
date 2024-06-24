#!/bin/bash

sed -i "s|hostname|$HOSTNAME|g" /etc/nginx/conf.d/nginx.conf

sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Menu/auth.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Menu/browser_nav.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Menu/rgpd.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/answer.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/database.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/offer.js

nginx -g 'daemon off;'