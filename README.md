# Ciri GraphQL API #

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

Ciri use docker for deployment. It use Bitbucket Pipeline to archieve CI/CD.

You can also build your own docker image by running the following command in the project root dictionary.

````
docker build -t YOUR_IMAGE_NAME .
````

Ciri uses .env to expose environment variables, you need to fill in the fields specified in .env.sample.
