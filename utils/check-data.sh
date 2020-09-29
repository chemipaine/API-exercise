#!/bin/bash

curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=db0" --data-urlencode 'q=SELECT * FROM host1'