#!/bin/bash

#check if docker is installed
if ! command -v docker &> /dev/null; then
	echo "Docker is not installed. Please install Docker and try again."
	exit 1
fi

#Start docker desktop
open -a Docker

#wait for docker to be ready
while ! docker system info > /dev/null 2>&1; do
	echo "Waiting for Docker to start..."
	sleep 1
done

#run command
docker compose up & 

#open app
sleep 7
open http://localhost:3000
