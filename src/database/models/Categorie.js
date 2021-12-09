const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CategorieSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Categorie', CategorieSchema);