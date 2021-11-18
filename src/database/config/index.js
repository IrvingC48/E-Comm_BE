const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL_PROD, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> Error ocurrido de la database");
});
db.once("open", () => {
    console.log("> Conexión exitosa a la database")
});

module.exports = db;