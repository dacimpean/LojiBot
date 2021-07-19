#!/usr/bin/env bash

if [ "$#" -lt 1 ] ; then
    echo "usage: ./bin/build-api <version> <?profile=default>"
    exit 1
fi

version=$1
profile=${2-default}
ecr=239905773778.dkr.ecr.us-east-2.amazonaws.com
tag=loji-api:$version

echo "building api..."
docker build -t $ecr/$tag ./api

echo "authenticating to $ecr registry"
$(aws ecr get-login --no-include-email --region us-east-2 --profile=$profile)

echo "pushing $tag to $ecr registry"
docker push $ecr/$tag
