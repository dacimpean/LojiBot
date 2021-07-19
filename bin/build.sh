#!/usr/bin/env bash

if [ "$#" -lt 1 ] ; then
    echo "usage: ./bin/build <version> <?profile=default>"
    exit 1
fi

version=$1
profile=${2-default}

$PWD/bin/build-client.sh $version $profile
$PWD/bin/build-api.sh $version $profile

read -p "Do you want to deploy $version? [y/N]" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]] ; then
    $PWD/bin/push.sh $version $profile
fi
