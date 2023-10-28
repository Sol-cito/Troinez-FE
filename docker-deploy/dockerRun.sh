#!/bin/bash
TAG=$1

# docker network
network="web-lb"
docker_container_ls_header="CONTAINER ID"
docker_container_prefix="troisnez-fe"

function deploy_container {
    target=$1
    for elt in "${target[@]}"; do
        container_name="$docker_container_prefix""$elt"
        docker run -d --name "$container_name" --net "$network" "$docker_container_prefix:${TAG}"
    done
}

function start_container {
    target=$1
    for elt in "${target[@]}"; do
        container_name="$docker_container_prefix""$elt"
        docker start "$container_name"
    done
}

function stop_container {
    target=$1
    for elt in "${target[@]}"; do
        container_name="$docker_container_prefix""$elt"
        docker stop "$container_name"
    done
}

function remove_container {
    target=$1
    for elt in "${target[@]}"; do
        container_name="$docker_container_prefix""$elt"
        docker rm "$container_name"
    done
}

function health_check {
    health_status="Ok"

    health_check_url="https://troisnez.com"

    for retry_count in $(seq 1 10); do
        response=$(curl -s "$health_check_url")
        up_count=$(echo "$response" | grep 'Troisnez' | wc -l)

        if [ "$up_count" -ge 1 ]; then
            break
        fi

        if [ "$retry_count" -eq 10 ]; then
            health_status="NotOk"
            break
        fi
        sleep 10
    done

    if [ "$health_status" == "Ok" ]; then
        echo "success"
    else
        echo "fail"
    fi
}

echo "[INFO] Start Blue Green Deployment"

# container check
container_count=$(docker container ls --filter "name=$docker_container_prefix" | grep -vc "$docker_container_ls_header")

# container nothing ( exit code 0 )
# deploy green
if [ "$container_count" == "0" ]; then
    green=("01")
    deploy_container "$green"
    health_result=$(health_check)

    if [ "$health_result" == "fail" ]; then
        exit 1
    else
        exit 0
    fi
else
    # deploy green and stop blue
    start_container=$(docker container ls --filter "name=$docker_container_prefix" | grep -v grep | grep "$docker_container_prefix""01")

    # 01번 container가 기동중인경우
    if [ -n "$start_container" ]; then
        green=("02")
        blue=("01")
    else
        green=("01")
        blue=("02")
    fi
    echo "[INFO] Blue : troisnez-be$blue Green : troisnez-be$green"
    # deploy green
    echo "[INFO] Deploy Green Container"
    deploy_container "$green"
    # stop blue
    echo "[INFO] Stop Blue Container"
    stop_container "$blue"

    sleep 5
fi

# health check green
health_result=$(health_check)
sleep 10

# rollback and remove green ( exit code 1 )
if [ "$health_result" == "fail" ]; then
    echo "[ERROR] Health Check Fail"
    # start blue
    echo "[INFO] Start Blue Containers"
    start_container "$blue"

    # stop green
    echo "[INFO] Stop Green Containers"
    stop_container "$green"

    # remove green
    echo "[INFO] Remove Green Containers"
    remove_container "$green"

    echo "[ERROR] Rollback to Blue And Remove Green"
    echo "[ERROR] Exit 1"

    exit 1
else
    # Success BlueGreen Deployment -> Remove blue ( exit code 0 )
    echo "[INFO] Health Check Success"
    echo "[INFO] Remove Blue Containers"
    remove_container "$blue"
    echo "[INFO] Complete BlueGreen Deployment"
    exit 0
fi
