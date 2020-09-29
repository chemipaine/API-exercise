#!/bin/bash

#sudo docker exec -it influxdb influxd backup -portable -database db0 -host localhost:8088 /tmp/backup
#sudo docker cp influxdb:/tmp/backup/. backup/

sudo docker cp backup/. influxdb:/tmp/backup
curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=DROP DATABASE "db0"'
sudo docker exec -it influxdb influxd restore -portable -db db0 /tmp/backup/