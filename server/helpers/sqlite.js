const sqlite3 = require("sqlite3").verbose();
const config = require("../config");

const openDB = () => {
  let db = new sqlite3.Database(`./db/${config.dbname}`, err => {
    if (err) return console.error(err.message);
    console.log(`Connected to SQlite database: ./db/${config.dbname}.`);
  });
  return db;
};

const closeDB = db => {
  db.close(err => {
    if (err) return console.error(err.message);
    console.log("Closed the database connection.");
  });
};

const selectRow = (query, args) => {
  let db = openDB();
  return new Promise((resolve, reject) => {
    db.get(query, args, (err, row) => {
      closeDB(db);
      if (err) reject(err);
      resolve(row);
    });
  });
};

const insert = (query, args) => {
  let db = openDB();
  return new Promise((resolve, reject) => {
    db.run(query, args, err => {
      closeDB(db);
      if (err) reject(err);
      resolve(true);
    });
  });
};

const getUser = email => {
  console.log(`Looking up user: ${email} in database.`);
  return selectRow("SELECT * FROM users WHERE email = ?", [email]);
};

const addUser = (email, password) => {
  console.log(`Adding user: ${email} to database.`);
  getUser(email).then(row => {
    if (row) return false;
    return insert("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
  });
};

module.exports = {
  addUser,
  getUser
};
