#!/usr/bin/env bash

if [ "$#" -lt 1 ] ; then
    echo "usage: ./bin/build-client <version> <?profile=default>"
    exit 1
fi

version=$1
profile=${2-default}

echo "building client app..."
cd $PWD/app

echo "installing node packages..."
npm i

echo "building application..."
npm run build

echo "uploading application to S3..."
aws s3 sync ./build s3://staging-loji-app/$version --profile $profile

echo "version $version has been deployed to S3 bucket successful"
