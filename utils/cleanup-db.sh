#!/bin/bash

echo "deleting database..."
curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=DROP DATABASE "db0"'
echo "creating database..."
curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=CREATE DATABASE "db0"'