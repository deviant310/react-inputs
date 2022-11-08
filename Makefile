-include .env

define Package
$(shell docker run --rm -v ${PWD}/package.json:/usr/src/app/package.json ${DOCKER_IMAGE} node -p "require('./package.json').$(1)")
endef

APP_NAME:= $(call Package, name)

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

development-build:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		webpack

production-build:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		webpack --env production

test:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-e FORCE_COLOR=true \
		${DOCKER_IMAGE} \
		jest $(filter-out $@,$(MAKECMDGOALS))

pack:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-v ${PWD}/$(filter-out $@,$(MAKECMDGOALS)):/usr/src/pack \
		${DOCKER_IMAGE} \
		npm pack --pack-destination="../pack"

.PHONY: docs
docs:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		-v ${PWD}/$(or $(filter-out $@,$(MAKECMDGOALS)), docs):/usr/src/docs \
		${DOCKER_IMAGE} \
		typedoc --cleanOutputDir false --out ../docs
