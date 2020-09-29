# API Exercise

## How to setup

### Requirements

- docker
- docker-compose
- linux/MacOs (In windows may work but not tested)

## How it works

Run docker-compose up -d to initialize influxdb database and nodejs API. 
To access API in the browser http://localhost:3000.

### Import data of 1 year to database

Run utils/oneyeardata.sh to import one year entries for the example metric (1 per each minute)

### Ingestion script

If you want to ingest data from the last 5 minutes use data-ingestion.sh

#### Modes

Please set INGEST_MODE var to the desired mode:

- realtime (it will ingest 5 mins of data every 1 min)

- test-mode (it will ingest data for the last 5 min in one go)

### Database Ops

To clear all data on database use utils/cleanup-db.sh

To check all data stored on database use check-data.sh

### API features:

- http://localhost:3000/alldata - shows all data for our example metric in the database

- http://localhost:3000/lastminute

- http://localhost:3000/last3minutes

- http://localhost:3000/last24hours

- http://localhost:3000/lastweek

- http://localhost:3000/lastmonth

- http://localhost:3000/lastyear



## Nice to have

- Ability to check metrics for a specific timestamp range

- API authentication && database authentication

- Ingestion script dockerized (makes sense if the data ingestion occurs in realtime)

- Tests

- Graphical interface (like grafana)