FROM node:boron-alpine

ENV NODE_ENV 'production'

RUN npm install -g sequelize sequelize-cli

RUN mkdir /ciri
WORKDIR /ciri

ADD package.json /ciri/package.json
RUN npm install

ADD ./dist /ciri
