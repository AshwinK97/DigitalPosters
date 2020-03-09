const objectID = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const config = require("../config");
const client = new MongoClient(config.url, { useNewUrlParser: true });

const savePoster = data => {
  client.connect(err => {
    const db = client.db("eposter");
    const collection = db.collection("posters");
    collection.find({ userID: data.userID }).toArray((error, results) => {
      if (error) {
        console.error(error);
      }
      if (results.length === 0) {
        collection.insertOne({ userID: data.userID, posterID: data.poster.id, posterContent: data.poster.content }, (err, db) => {
          if (err) {
            console.log(err);
          }
          console.log("inserted item");
        });
      } else {
        collection.updateOne(
          { userID: data.userID, posterID: data.poster.id },
          { $set: { posterContent: data.poster.content } },
          (err, results) => {
            console.log("item updated");
          }
        );
      }
    });
  });
};

module.exports = {
  savePoster
};
