const bodyParser = require("body-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const config = require("./config");
const db = require("./helpers/db");

const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post("/uploadImage", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send("No file uploaded");
  if (!req.body.filename || !req.body.userID) return res.status(400).send("No file name / user id");
  // image name: <userid>_<name>.jpg
  fs.writeFile(`${req.body.userID}$_{res.body.filename}`, req.files.image, err => {
    if (err) return res.status(500).send(`error writing ${req.query.userid}_${req.query.filename}`);
    return res.status(200);
  });
});

app.get("/getImage", (req, res) => {
  if (!req.query.filename || !req.query.userid) return res.status(400).send("No file name / user id");
  fs.readFile(`${req.query.userid}_${req.query.filename}`, (err, imagedata) => {
    if (err) return res.status(500).send(`error retrieving ${req.query.userid}_${req.query.filename}`);
    return res.status(200).send(imagedata);
  });
});

app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
