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
