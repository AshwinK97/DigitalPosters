// import data from "posterJSON";
const express = require("express");
const app = express();
const objectID = require("mongodb").ObjectID;
const router = express.Router();

const Port = process.env.Port || 3000;

const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://jasUser:jasUser@cluster0-ewygn.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

// console.log(JSON.stringify(data));

const fs = require("fs");

let rawdata = fs.readFileSync("posterJSON.json");
let posterInfo = JSON.parse(rawdata);
console.log(posterInfo);

client.connect(err => {
  const db = client.db("eposter");
  var collection = db.collection("posters");
  // perform actions on the collection object
  app.listen(Port, () => console.log("Server started"));
});

// collection.find({ userID: userID, posterID: posterID }).toArray((error, results) => {
//   if (results.length === 0) {
//     var item;

//     collection.insertOne(item, function(err, db) {
//       console.log("inserted item");
//       if (error) {
//         console.log(error);
//       }
//     });
//   } else {
//     collection.updateOne(
//       { _id: objectID(id) },
//       { $set: { userID: userID, posterID: posterID, posterContent: posterContent } },
//       (error, results) => {
//         console.log("item updated");
//       }
//     );
//   }
// });
