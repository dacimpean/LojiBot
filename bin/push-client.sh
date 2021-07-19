#!/usr/bin/env bash

if [ "$#" -lt 1 ] ; then
    echo "usage: ./bin/push-client <version> <?profile=default>"
    exit 1
fi

version=$1
profile=${2-default}

echo "pushing version $version to staging..."
aws s3 rm --recursive s3://staging-loji-app/app --profile $profile
aws s3 cp --recursive s3://staging-loji-app/$version s3://staging-loji-app/app --profile $profile

echo "version $version is up and running"
