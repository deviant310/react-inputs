-include .env

env:
	cp ./.env.example .env

image:
	docker build -t ${DOCKER_IMAGE} .

install:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		-u node \
		--env-file=.env \
		${DOCKER_IMAGE} \
		npm i $(filter-out $@,$(MAKECMDGOALS))

remove:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		-u node \
		--env-file=.env \
		${DOCKER_IMAGE} \
		npm uninstall $(filter-out $@,$(MAKECMDGOALS))

dev-server:
	docker run \
		--rm \
		--name ${APP_NAME} \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		-u node \
		-p ${DEV_SERVER_PORT_FORWARDED}:${DEV_SERVER_PORT} \
		--env-file=.env \
		${DOCKER_IMAGE} \
		dumb-init node scripts/dev-server.js

dev-watcher:
	docker run \
		--rm \
		--name ${APP_NAME} \
		-v ${PWD}:/usr/src/app \
		-v ${PWD}/${BUILD_PATH_HOST}:/usr/src/app/${BUILD_PATH} \
		-w /usr/src/app \
		-u node \
		--env-file=.env \
		${DOCKER_IMAGE} \
		dumb-init node scripts/dev-watcher.js

production-build:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-v ${PWD}/${BUILD_PATH_HOST}:/usr/src/app/${BUILD_PATH} \
		-w /usr/src/app \
		-u node \
		--env-file=.env \
		${DOCKER_IMAGE} \
		node scripts/production-build.js
