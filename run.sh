cd ./microservices

cp -R ./shared/ ./auth-service/
cp -R ./shared/ ./customer-service/
cp -R ./shared/ ./product-service/
cp -R ./shared/ ./transaction-service/
docker-compose build --no-cache

if [ "$1" == "elk" ]
  then
    docker-compose up &
    cd ./elk
    docker-compose up
  else
    docker-compose up
fi
