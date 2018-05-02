cd ./microservices

# Store current IP in the .env file, so the services can talk to each other
printf "HOSTIP=" > .env
ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2  >> .env

cp -R ./shared/ ./auth-service/
cp -R ./shared/ ./customer-service/
cp -R ./shared/ ./product-service/
cp -R ./shared/ ./transaction-service/

docker-compose build

if [ "$1" == "elk" ]
  then
    echo "Starting Microservices and ELK"
    docker-compose up &
    cd ./elk
    docker-compose up
  else
    echo "Starting Microservices"
    docker-compose up
fi
