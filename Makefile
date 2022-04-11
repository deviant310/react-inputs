include .env

env:
	cp .env.example .env

image:
	docker build -t ${DOCKER_IMAGE} .

install:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		${DOCKER_IMAGE} \
		npm i $(filter-out $@,$(MAKECMDGOALS))

remove:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		${DOCKER_IMAGE} \
		npm uninstall $(filter-out $@,$(MAKECMDGOALS))

start:
	docker run \
		--rm \
		--name ${APP_NAME} \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		-p $(or ${APP_PORT}, 4000):3000 \
		${DOCKER_IMAGE} \
		dumb-init react-scripts start
