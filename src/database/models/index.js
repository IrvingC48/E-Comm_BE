const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require('./User');
db.Product = require('./Product');
db.Role = require('./Role');
db.Order = require('./Order');
db.Categorie = require('./Categorie');

db.ROLES = ["user", "admin"];

module.exports = db;
