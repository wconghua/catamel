#!/usr/bin/env bash


echo "connect via mongo"
mongo --host mongodb dacat createIndex.js
echo "sleep for 2"
sleep 2
echo "starting npm test"
npm test
