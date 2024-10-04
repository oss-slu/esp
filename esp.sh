#!/bin/bash

#check if docker is installed
if ! /usr/local/bin/docker --version  &> /dev/null; then
	echo "Docker is not installed. Please install Docker and try again."
	exit 1
fi

#Start docker desktop
open --background -a Docker

#wait for docker to be ready
while ! docker  info > /dev/null 2>&1; do
	echo "Waiting for Docker to start..."
	sleep 5
done

#run command
docker compose up & 

#open app
sleep 7
open http://localhost:3000
