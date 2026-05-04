#!/bin/bash 


rm -r /var/www/html/candoor-frontend/previous_builds/build
mv /var/www/html/candoor-frontend/build /var/www/html/candoor-frontend/previous_builds
mv /home/ubuntu/agent/workspace/candoor-front-end_development/build /var/www/html/candoor-frontend/