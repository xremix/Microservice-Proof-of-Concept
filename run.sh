
mkdir ./auth-service/shared/
mkdir ./customer-service/shared/
mkdir ./product-service/shared/
mkdir ./transaction-service/shared/

cp ./shared/* ./auth-service/shared/
cp ./shared/* ./customer-service/shared/
cp ./shared/* ./product-service/shared/
cp ./shared/* ./transaction-service/shared/
docker-compose build --no-cache
docker-compose up
