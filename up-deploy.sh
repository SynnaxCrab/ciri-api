yarn build:up 
cd up
echo PGHOST=$PGHOST > .env
echo PGUSER=$PGUSER >> .env
echo PGPASSWORD=$PGPASSWORD >> .env
echo PGDATABASE=$PGDATABASE >> .env
yarn install --prod 
../bin/up deploy production