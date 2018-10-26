#!/usr/bin/env bash

mongo --host mongodb dacat createIndex.js
sleep 20
npm test
