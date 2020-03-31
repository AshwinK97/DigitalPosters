const MongoClient = require("mongodb").MongoClient;
const config = require("../config");
const client = new MongoClient(config.url, { useNewUrlParser: true });

const savePoster = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      collection.find({ userID: data.userID }).toArray((error, results) => {
        if (error) {
          console.error(error);
        }
        if (results.length === 0) {
          collection.insertOne({ userID: data.userID, posterID: data.poster.id, posterContent: data.poster.content, publishLink: data.publishLink }, (err, results) => {
            if (err) {
              reject(err);
            }
            console.log("Inserted!");
            resolve(results);
          });
        } else {
          collection.updateOne({ userID: data.userID }, { $set: { posterContent: data.poster.content, publishLink: data.publishLink } }, (err, results) => {
            if (err) {
              reject(err);
            }
            console.log("Updated!");
            resolve(results);
          });
        }
      });
    });
  });
};

const publishPoster = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      collection.updateOne({ userID: data.userID }, { $set: { published: true } }, (err, results) => {
        if (err) {
          reject(err);
        }
        console.log("Published!");
        resolve(results);
      });
    });
  });
};

const loadPoster = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      collection.find({ userID: data }).toArray((err, results) => {
        if (err) {
          reject(err);
        }
        console.log(results);
        resolve(results);
      });
    });
  });
};

module.exports = {
  savePoster,
  loadPoster,
  publishPoster
};
