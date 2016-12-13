FROM node:boron-alpine

ENV NODE_ENV 'production'

RUN npm install -g sequelize sequelize-cli

RUN mkdir /ciri-api
WORKDIR /ciri-api

ADD package.json /ciri-api/package.json
RUN npm install

ADD ./dist /ciri-api
