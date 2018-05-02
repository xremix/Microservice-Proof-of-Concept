cd ./microservices

printf "HOSTIP=" > .env
ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2  >> .env

cp -R ./shared/Dockerfile ./auth-service/Dockerfile
cp -R ./shared/Dockerfile ./customer-service/Dockerfile
cp -R ./shared/Dockerfile ./product-service/Dockerfile
cp -R ./shared/Dockerfile ./transaction-service/Dockerfile

docker-compose build --no-cache

if [ "$1" == "elk" ]
  then
    docker-compose up &
    cd ./elk
    docker-compose up
  else
    docker-compose up
fi
