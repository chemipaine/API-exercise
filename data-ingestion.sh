#!/bin/bash

set -o allexport; source .env; set +o allexport

TIMESTAMP="$(date +%s)"
TIMESTAMP=`expr $TIMESTAMP - 300`

function ingest {
    TIMESTAMP=`expr $TIMESTAMP + 60`
    CPU_LOAD="$(echo "scale=2; 100*$RANDOM/32768" | bc)"
    PLAYS="$(( $RANDOM % 500000 + 1 ))"

    curl -i -XPOST 'http://localhost:8086/write?db=db0&precision=s' \
         --data-binary 'host1 cpu_load='$CPU_LOAD',plays='$PLAYS' '$TIMESTAMP''

}

function realtime {

    TIMESTAMP="$(date +%s)"
    for i in {1..5}; do ingest; sleep 60; done

}

function test-mode {

    for i in {1..5}; do ingest; done

}

$INGESTION_MODE