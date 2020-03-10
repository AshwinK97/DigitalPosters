const express = require("express");
const bodyParser = require("body-parser");
// const fs = require("fs");
const config = require("./config");
const db = require("./helpers/db");

const app = express();

// enable body parser for json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// allow requests from selected domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/savePoster", (req, res) => {
  // const posterData = req.body

  // console.log(posterData);
  // let posterData = fs.readFileSync("./posterJSON.json");
  // const posterInfo = JSON.parse(posterData);
  db.savePoster(req.body).then(() => {
    res.send("Save success!")
  }).catch(err => res.send(err));
});

app.post("/loadPoster", (req, res) => {
  console.log(req.body.userID);
  db.loadPoster(req.body.userID).then((data) => {
    res.send(data[0].posterContent);
  }).catch(err => res.send(err));
});

app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
