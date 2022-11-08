FROM node:18.0.0

RUN npm i npm@8.19.3 -g

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

USER node

CMD ["webpack", "serve"]
