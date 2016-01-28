#!/bin/bash
PROJECT=$(pwd)
if [ -f "${PROJECT}/logs/oauth2-server.pid" ] 
then  
    pid=$(cat ${PROJECT}/logs/oauth2-server.pid)
    kill -QUIT ${pid}
    rm ${PROJECT}/logs/oauth2-server.pid
    echo "oauth2-server stopped."
else 
    echo "oauth2-server not running."
fi
