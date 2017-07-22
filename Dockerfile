FROM node:alpine

ENV NODE_ENV 'production'

EXPOSE 3000

RUN yarn global add sequelize sequelize-cli

RUN mkdir /ciri-api
WORKDIR /ciri-api

ADD package.json yarn.lock /ciri-api/
RUN yarn install --pure-lockfile

ADD ./dist /ciri-api

CMD ["yarn", "start"]
