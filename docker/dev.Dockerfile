FROM node:17.8.0

RUN apt update -y && \
    apt install -y dumb-init

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

USER node

COPY --chown=node:node package*.json ./

RUN npm i

COPY --chown=node:node . .

CMD ["dumb-init", "./node_modules/.bin/react-scripts", "start"]
