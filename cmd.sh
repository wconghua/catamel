#!/usr/bin/env bash

DOCKERFILE="-f ./docker-compose.yaml"
if [ "$(hostname)" == "kubetest01.dm.esss.dk" ]; then
    DOCKERFILE="-f ./docker-compose.proxy.yaml"
fi
docker-compose ${DOCKERFILE} down -v --rmi all
docker-compose ${DOCKERFILE} build --no-cache --force-rm
docker-compose  ${DOCKERFILE} run catamel ./wait.sh --verbose
