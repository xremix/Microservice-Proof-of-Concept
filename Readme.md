# Microservice Proof of Concept
## About

This is a Proof of Concept for Microservices, developed in `Node.js` and by using the ELK-Stack.

## Microservices

### Start
Start the microservices by running
`./run.sh`

To start the ELK Stack as well run
`./run.sh elk`


To stop ELK again run
```
docker stop elk_kibana_1
docker stop elk_logstash_1
docker stop elk_elasticsearch_1
````

### Explantation

#### Structure

- `./shared` Is a folder that will be copied to each of the underlying microservices. This is a hacky way to not have to build NPM modules for now
- `./*-service` This are the folders of the microservices. Each Service has an `app.js` with the actuall server and a `data.json` with a read-only database.


#### Data
Right now all the services use the same `db.js` module, that allows to provide (and log) data access to the `data.json`.

#### Middlewares
The services contain the following middleware functionalities:

- `authMiddleware` to provide Authentication functionalities and auto `HTTP-401` responses
- `correlationReturnMiddleware` that returns the generated `Correlation-ID` back to the client
- `sessionVarMiddleware` that stores request variables for the current session. This is mostly used for logging
- `cacheMiddleware` to provide `E-Tag` Client-Caching functionality

## ELK-Stack

### Start
Start the ELK-Stack `docker-compose up`

Go to Kibana web UI via http://localhost:5601

### Install

Creat an index pattern
```
curl -XPOST -D- 'http://localhost:5601/api/saved_objects/index-pattern' \
    -H 'Content-Type: application/json' \
    -H 'kbn-version: 6.2.3' \
    -d '{"attributes":{"title":"logstash-*","timeFieldName":"@timestamp"}}'
```

### Example

Send Data to logstash `$ nc localhost 5000 < /path/to/logfile.log`
