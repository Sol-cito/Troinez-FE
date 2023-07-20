#!/bin/bash
TAG=$1

# docker stop and rm
container_name="troisnez-fe"

docker stop $container_name
docker rm $container_name

# docker run
docker run -p 3000:3000 -d -it --name $container_name "$container_name:${TAG}"