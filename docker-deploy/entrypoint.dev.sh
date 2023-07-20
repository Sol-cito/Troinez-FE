#!/bin/bash

# docker stop and rm
container_name="troisnez-fe"

docker stop $container_name
docker rm $container_name

# docker run
docker run -d --name $container_name -p 3000:3000 "$container_name:dev"