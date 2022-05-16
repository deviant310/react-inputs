FROM node:18.0.0

RUN apt update -y && \
    apt install -y dumb-init
RUN npm i npm@8.10.0 -g

ENV PATH /usr/src/app/node_modules/.bin:$PATH
