FROM node:17.8.0

RUN apt update -y && \
    apt install -y dumb-init
RUN npm i npm@latest -g

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

USER node

ENV PATH /usr/src/app/node_modules/.bin:$PATH
