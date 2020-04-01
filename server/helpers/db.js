const MongoClient = require("mongodb").MongoClient;
const config = require("../config");
const client = new MongoClient(config.url, { useNewUrlParser: true });

const hash = require("./hash");

const signup = async data => {
  const id = await hash.generateID();
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("users");
      collection.find({ username: data.username }).toArray((error, results) => {
        if (error) {
          console.error(error);
        }
        if (results.length === 0) {
          collection.insertOne({ username: data.username, password: data.password, userID: id }, (err, results) => {
            if (err) {
              reject(err);
            }
            console.log("Inserted!");
            resolve({userID: id});
          });
        } else {
          reject("User already exists.")
        }
      });
    });
  });
};

const login = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("users");
      collection.find({ username: data.username, password: data.password }).toArray((error, results) => {
        if (error) {
          console.error(error);
        }
        if (results.length === 1) {
          resolve(results[0]);
        } else {
          reject("Username or Password is incorrect.")
        }
      });
    });
  });
};

const savePoster = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      collection.find({ userID: data.userID, posterID: data.poster.id }).toArray((error, results) => {
        if (error) {
          console.error(error);
        }
        if (results.length === 0) {
          console.log(`Title: ${data.poster.title} Description: ${data.poster.description}`)
          collection.insertOne({ userID: data.userID, posterID: data.poster.id, posterContent: data.poster.content, posterTitle: data.poster.title, posterDescription: data.poster.description, posterImage: "", publishID: "" }, (err, results) => {
            if (err) {
              reject(err);
            }
            console.log("Inserted!");
            resolve(results);
          });
        } else {
          collection.updateOne({ userID: data.userID, posterID: data.poster.id }, { $set: { posterContent: data.poster.content, publishID: data.publishID, posterImage: data.posterImage } }, (err, results) => {
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
  console.log(JSON.stringify(data));
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("published-posters");
      collection.find({ publishID: data.publishID }).toArray((error, results) => {
        if (error) {
          console.error(error);
        }
        if (results.length === 0) {
          collection.insertOne({ posterContent: data.poster.content, publishID: data.publishID, posterTitle: data.posterTitle }, (err, results) => {
            if (err) {
              reject(err);
            }
            console.log("Inserted!");
            resolve(results);
          });
        } else {
          collection.updateOne({ publishID: data.publishID }, { $set: { posterContent: data.poster.content, posterTitle: data.posterTitle } }, (err, results) => {
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

const loadPoster = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      collection.find({ userID: data.userID, posterID: data.posterID }).toArray((err, results) => {
        if (err) {
          reject(err);
        }
        console.log(results);
        resolve(results);
      });
    });
  });
};

const loadPublishedPoster = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("published-posters");
      collection.find({ publishID: data.publishID }).toArray((err, results) => {
        if (err) {
          reject(err);
        }
        console.log(results);
        resolve(results);
      });
    });
  });
};

const loadPostersByUserID = data => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      collection.find({ userID: data.userID }).toArray((err, results) => {
        if (err) {
          reject(err);
        }
        const posters = results.map(data => {
          if (data.posterTitle === null || data.posterTitle === undefined) {
            return {
              id: data.posterID,
              title: data.posterID,
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
              image: ""
            }
          } else {
            return {
              id: data.posterID,
              title: data.posterTitle,
              description: data.posterDescription,
              image: data.posterImage
            }
          }
        });
        console.log(posters);
        resolve(posters);
      });
    });
  });
};


const deletePoster = data => {
  console.log(JSON.stringify(data))
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const db = client.db("eposter");
      const collection = db.collection("posters");
      try {
        collection.deleteOne({ userID: data.userID, posterID: data.posterID })
        console.log(data.posterID + " Deleted!");
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  });
};

module.exports = {
  signup,
  login,
  savePoster,
  loadPoster,
  publishPoster,
  loadPublishedPoster,
  loadPostersByUserID,
  deletePoster
};
