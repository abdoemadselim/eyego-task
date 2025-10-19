docker pull image_name: download an image from docker hub or whatsoever docker registry
docker run image: creates a container from the image (and pull the image if doesn't exist locally)
docker run --rm image: creates a container, runs the command, and remove the container afterwards
docker run python:3.1-slim python -c 'print("hello world")': runs a command (python -c 'print()) inside the container after creating it
docker image ls: display all pulled images
docker ps: display all active containers
docker ps -a: display all containers
docker stop container_id
docker logs container_id
docker container prune: remove all inactive containers
docker exec -it container_id /bin/sh: opens the containers in interactive mode (interacts with the shell inside it)

// How to keep persistent data (not tied to a container and stays even after removing the container)
// Via using docker Volumns 
docker volume create volume_name
docker exec -it -v testvolume:/data container_id /bin/sh --> maps testvolume to /data directory inside the container