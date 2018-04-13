
mkdir ./auth_service/shared/
mkdir ./customer_service/shared/
mkdir ./product_service/shared/
mkdir ./transaction_service/shared/

cp ./shared/* ./auth_service/shared/
cp ./shared/* ./customer_service/shared/
cp ./shared/* ./product_service/shared/
cp ./shared/* ./transaction_service/shared/
docker-compose build --no-cache
docker-compose up
