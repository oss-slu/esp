#!/bin/bash

echo "Opening Docker..."
open -a Docker

echo "Waiting for Docker to start..."
while ! docker info > /dev/null 2>&1; do
    sleep 5
done
echo "Docker started!"

echo "Running 'docker compose up' in the current directory..."
docker compose up -d

# Wait for all containers to be up and running
echo "Waiting for Docker Compose to be fully up..."
while [ "$(docker compose ps | grep 'Up' | wc -l)" -eq 0 ]; do
    sleep 2
done
echo "Docker Compose is up and running!"

echo "Opening http://localhost:3000/ in your browser..."
open http://localhost:3000/

echo "App is running at http://localhost:3000."
echo "To stop the app, close this window or press Ctrl+C."

trap cleanup EXIT

cleanup() {
    echo "Stopping Docker containers..."
    docker compose down

    echo "Waiting for all containers to stop..."
    while [ $(docker ps -q | wc -l) -ne 0 ]; do
        echo "Still waiting for containers to stop..."
        sleep 2
    done
    echo "All containers have been stopped and removed."

    echo "Removing Docker containers and cleaning up volumes..."
    docker system prune -f --volumes

    echo "Killing all Docker processes..."
    pkill -f docker
    echo "Docker processes have been terminated."

    echo "App has been closed, and Docker containers have been removed."
}

read -p "Press Enter or Ctrl+C to terminate the program..."

