const Influx = require("influx");
const express = require("express");
const http = require("http");
const app = express();

const influx = new Influx.InfluxDB({
  host: "influxdb",
  database: "db0",
  schema: [
    {
      measurement: "host1",
      fields: {
        cpu_load: Influx.FieldType.FLOAT,
        plays: Influx.FieldType.INTEGER,
      },
      tags: [""],
    },
  ],
});

app.get("/alldata", function (req, res) {
  influx
    .query(
      `
    select * from host1
  `
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.stack);
    });
});

app.get("/lastminute", function (req, res) {
    influx
      .query(
        `
      select * from host1 
      where time <= now() and time >= now() - 60s
    `
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  });

  app.get("/last3minutes", function (req, res) {
    influx
      .query(
        `
      select * from host1 
      where time <= now() and time >= now() - 180s
    `
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  });
app.get("/last24hours", function (req, res) {
    influx
      .query(
        `
      select * from host1 
      where time <= now() and time >= now() - 1d
    `
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  });

  app.get("/lastweek", function (req, res) {
    influx
      .query(
        `
      select * from host1 
      where time <= now() and time >= now() - 7d
    `
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  });

  app.get("/lastmonth", function (req, res) {
    influx
      .query(
        `
      select * from host1 
      where time <= now() and time >= now() - 30d
    `
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  });

  app.get("/lastyear", function (req, res) {
    influx
      .query(
        `
      select * from host1 
      where time <= now() and time >= now() - 365d
    `
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  });

influx
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes("db0")) {
      return influx.createDatabase("db0");
    }
  })
  .then(() => {
    http.createServer(app).listen(3000, function () {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(`Error creating Influx database!`);
  });