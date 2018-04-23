- start via `docker-compose up`

then
`$ nc localhost 5000 < /path/to/logfile.log`

then created an index pattern via
```
curl -XPOST -D- 'http://localhost:5601/api/saved_objects/index-pattern' \
    -H 'Content-Type: application/json' \
    -H 'kbn-version: 6.2.3' \
    -d '{"attributes":{"title":"logstash-*","timeFieldName":"@timestamp"}}'
```



Go to Kibana web UI via http://localhost:5601 
