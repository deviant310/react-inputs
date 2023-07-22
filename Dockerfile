FROM node:18.16.0

RUN npm i npm@9.8.0 -g

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

USER node
