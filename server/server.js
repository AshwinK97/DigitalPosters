const express = require("express");
const fs = require("fs");
const config = require("./config");
const db = require("./helpers/db");

const app = express();

app.get("/readjson", (req, res) => {
  let rawdata = fs.readFileSync("./posterJSON.json");
  let posterInfo = JSON.parse(rawdata);
  res.send(posterInfo);
  console.log(posterInfo.userID);
});

app.get("/savePoster", (req, res) => {
  let rawdata = fs.readFileSync("./posterJSON.json");
  let posterInfo = JSON.parse(rawdata);
  db.savePoster(posterInfo);
});

app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
