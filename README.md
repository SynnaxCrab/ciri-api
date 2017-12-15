# Ciri GraphQL API #

[![build status](https://travis-ci.org/winfield/ciri-api.svg?branch=master)](https://travis-ci.org/winfield/ciri-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/winfield/ciri-api.svg)](https://greenkeeper.io/)

GraphQL backend API for Ciri App.


## Development ##

````
yarn install && yarn dev
````

## Test ##

````
yarn install && yarn test
````

## Deployment ##

### Docker ###

Ciri can use docker for deployment. It use Bitbucket Pipeline to archieve CI/CD.

You can also build your own docker image by running the following command in the project root dictionary.

````
docker build -t YOUR_IMAGE_NAME .
````

Ciri uses .env to expose environment variables, you need to fill in the fields specified in .env.sample.

### AWS Lambda ###

Ciri also support AWS Lambda through apex/up.