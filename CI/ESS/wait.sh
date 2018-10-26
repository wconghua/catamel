#!/usr/bin/env bash

echo "sleep for 20"
sleep 20
echo "connect via mongo"
mongo --host mongodb dacat createIndex.js
echo "starting npm test"
npm test
