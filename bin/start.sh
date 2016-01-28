#!/bin/bash

PROJECT=$(pwd)
timestamp=$(date '+%s')
if [ -f "${PROJECT}/logs/oauth2-server.pid" ]; then  
    echo "oauth2-server is already running."
else
    echo "starting oauth2-server ... "
    nohup node server.js > ${PROJECT}/logs/oauth2-server-${timestamp}.log 2>&1 & echo $! > ${PROJECT}/logs/oauth2-server.pid
fi
