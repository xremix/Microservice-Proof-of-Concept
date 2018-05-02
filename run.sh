cd ./microservices

printf "HOSTIP=" > .env
ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2  >> .env

# cp -R ./shared/ ./auth-service/
# cp -R ./shared/ ./customer-service/
# cp -R ./shared/ ./product-service/
# cp -R ./shared/ ./transaction-service/

rm -rf ./auth-service/shared/
rm  ./auth-service/Dockerfile
rm  ./auth-service/package.json
rm -rf ./customer-service/shared/
rm  ./customer-service/Dockerfile
rm  ./customer-service/package.json
rm -rf ./product-service/shared/
rm  ./product-service/Dockerfile
rm  ./product-service/package.json
rm -rf ./transaction-service/shared/
rm  ./transaction-service/Dockerfile
rm  ./transaction-service/package.json
docker-compose build --no-cache

if [ "$1" == "elk" ]
  then
    docker-compose up &
    cd ./elk
    docker-compose up
  else
    docker-compose up
fi
