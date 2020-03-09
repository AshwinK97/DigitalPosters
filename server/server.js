const express = require("express");
const fs = require("fs");
const config = require("./config");
const db = require("./helpers/db");

const app = express();

app.get("/savePoster", (req, res) => {
  let rawdata = fs.readFileSync("./posterJSON.json");
  let posterInfo = JSON.parse(rawdata);
  db.savePoster(posterInfo);
  res.send("Save success!")
});

app.get("/loadPoster", (req, res) => {
  db.loadPoster(1).then((data) => {
    res.send(data);
  }).catch(err => res.send(err));
});

app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
