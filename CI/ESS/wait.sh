#!/usr/bin/env bash
echo "db.Dataset.createIndex( { \"\$**\": \"text\" } )"  | mongo --host mongodb
sleep 20
npm test
