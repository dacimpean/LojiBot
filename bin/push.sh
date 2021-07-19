#!/usr/bin/env bash

if [ "$#" -lt 1 ] ; then
    echo "usage: ./bin/push <version> <?profile=default>"
    exit 1
fi

version=$1
profile=${2-default}

$PWD/bin/push-client.sh $version $profile
$PWD/bin/push-api.sh $version $profile
