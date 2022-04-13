include .env

env:
	cp .env.example .env

image:
	docker build -t ${DOCKER_IMAGE} .

install:
	docker run \
	--rm \
	-v ${PWD}:/app \
	-w /app \
	${DOCKER_IMAGE} \
	npm ci

start:
	docker-compose up -d
