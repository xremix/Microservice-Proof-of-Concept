`sh run.sh`

Sample `.env` file
```
HOSTIP=192.168.1.123

```


## ELK
- start `docker-compose up`
-  Send Data to logstash `$ nc localhost 5000 < /path/to/logfile.log`
-  created an index pattern
```
curl -XPOST -D- 'http://localhost:5601/api/saved_objects/index-pattern' \
    -H 'Content-Type: application/json' \
    -H 'kbn-version: 6.2.3' \
    -d '{"attributes":{"title":"logstash-*","timeFieldName":"@timestamp"}}'
```
- Go to Kibana web UI via http://localhost:5601
