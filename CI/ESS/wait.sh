#!/usr/bin/env bash

echo "db.Dataset.createIndex( { \"\$**\": \"text\" } )"  | mongo --host mongodb dacat
sleep 20
npm test
