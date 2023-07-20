#!/bin/bash

echo "[Log] Health check URL: http://13.209.28.193:3000/"

for retry_count in $(seq 1 10)
do
  response=$(curl -s http://13.209.28.193:3000/)
  up_count=$(echo "$response" | grep 'IN GOLD WE TRUST PARIS' | wc -l)

  if [ "$up_count" -ge 1 ]
  then
    echo "[Log] Health check success"
    echo "[Log] Health check success response : ${response}"
    break
  else
    echo "[Log] Health check is not successful"
    echo "[Log] Health check failure response: ${response}"
  fi

  if [ "$retry_count" -eq 10 ]
  then
    echo "[Error] Health check fail. "
    exit 1
  fi

  echo "[Log] Health check connection fail. Retry..."
  sleep 10
done

echo "[Log] health check success....please wait..."
sleep 10