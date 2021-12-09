const mongoose = require('mongoose');
const Schema = mongoose.Schema;

RoleSchema = new Schema({
    name: String
});

module.exports = mongoose.model("Role", RoleSchema);