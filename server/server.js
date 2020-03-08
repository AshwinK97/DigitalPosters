const express = require("express");
const objectID = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

const app = express();

const uri = "mongodb+srv://jasUser:jasUser@cluster0-ewygn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get("/readjson", (req, res) => {
  let rawdata = fs.readFileSync("posterJSON.json");
  let posterInfo = JSON.parse(rawdata);

  // client.connect(err => {
  //   const db = client.db("eposter");
  //   var collection = db.collection("posters");
  //   collection.find({userID: posterInfo.})
  // });

  res.send(posterInfo);
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

app.listen(3000, () => console.log(`Server listening on port: 3000`));
