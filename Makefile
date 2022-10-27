-include .env

env:
	cp ./.env.example .env

image:
	docker build -t ${DOCKER_IMAGE} .

install:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		npm i $(filter-out $@,$(MAKECMDGOALS))

update:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		npm update $(filter-out $@,$(MAKECMDGOALS))

remove:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		npm uninstall $(filter-out $@,$(MAKECMDGOALS))

dev-server:
	docker run \
		--rm \
		--name ${APP_NAME} \
		-v ${PWD}:/usr/src/app \
		-p ${DEV_SERVER_PORT}:${DEV_SERVER_PORT} \
		${DOCKER_IMAGE}

open-browser:
	open http://localhost:${DEV_SERVER_PORT}

dev-watcher:
	docker run \
		--rm \
		--init \
		--name ${APP_NAME} \
		-v ${PWD}:/usr/src/app \
		-v ${PWD}/${BUILD_PATH_HOST}:/usr/src/app/${BUILD_PATH} \
		${DOCKER_IMAGE} \
		node scripts/dev-watcher.js

production-build:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-v ${PWD}/${BUILD_PATH_HOST}:/usr/src/app/${BUILD_PATH} \
		${DOCKER_IMAGE} \
		node scripts/production-build.js

test:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-e FORCE_COLOR=true \
		${DOCKER_IMAGE} \
		jest $(filter-out $@,$(MAKECMDGOALS)) --verbose
