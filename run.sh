cd ./microservices

# Store current IP in the .env file, so the services can talk to each other
printf "HOSTIP=" > .env
ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2  >> .env

cp -R ./shared/ ./auth-service/
cp -R ./shared/ ./customer-service/
cp -R ./shared/ ./product-service/
cp -R ./shared/ ./transaction-service/

if [ "$1" == "elk" ]
  then
    cd ../elk
    docker-compose up -d $2
    cd ../microservices
fi

docker-compose up --build
