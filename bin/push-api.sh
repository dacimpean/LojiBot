#!/usr/bin/env bash

if [ "$#" -lt 1 ] ; then
    echo "usage: ./bin/push-api <version> <?profile=default>"
    exit 1
fi

version=$1
profile=${2-default}
key=$PWD/bin/keys/loji-api-staging.pem
ecr=239905773778.dkr.ecr.us-east-2.amazonaws.com
ec2=ec2-3-18-103-182.us-east-2.compute.amazonaws.com
tag=loji-api:$version
app_name=loji-api

echo "pushing api $version to EC2 instance..."
echo "connecting to $ec2..."
chmod 400 $key
ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i $key ec2-user@$ec2 bash -c "'
    echo "authenticating to $ecr registry"
    $(aws ecr get-login --no-include-email)
    echo "pulling $version from $ecr registry"
    docker pull $ecr/$tag
    echo "stopping current application..."
    docker stop $app_name
    echo "cleaning up docker entities..."
    docker system prune -f
    echo "stating $version..."
    docker run -p 80:8090 --name $app_name -d $ecr/$tag
    echo "disconnecting from $ec2..."
'"
echo "$version is up and running"
