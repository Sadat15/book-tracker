const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// mongoose.set("strictQuery", true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.books = require("./book.model.js")(mongoose);

module.exports = db;
