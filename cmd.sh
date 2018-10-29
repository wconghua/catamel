#!/usr/bin/env bash

    DOCKERFILE="-f ./docker-compose.yaml"
if [ "$(hostname)" == "kubetest01.dm.esss.dk" ]; then
    DOCKERFILE="-f ./CI/ESS/docker-compose.yaml"
fi
docker-compose ${DOCKERFILE} build --no-cache --force-rm
docker-compose  ${DOCKERFILE} run catamel ./wait.sh --verbose
