#!/bin/bash

sed -i "s|hostname|$HOSTNAME|g" /etc/nginx/conf.d/nginx.conf

sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Menu/auth.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/browser_nav.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/rgpd.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/answer.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/database.js.js
sed -i "s|hostname|$HOSTNAME|g" /home/front-end/JavaScript/Online/offer.js

nginx -g 'daemon off;'