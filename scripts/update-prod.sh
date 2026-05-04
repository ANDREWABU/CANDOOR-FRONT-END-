#!/bin/bash

rm -r /var/www/html/front-end/previous_builds/build
mv /var/www/html/front-end/build /var/www/html/front-end/previous_builds
mv /home/ubuntu/agent/workspace/candoor-front-end_main/build /var/www/html/front-end/

