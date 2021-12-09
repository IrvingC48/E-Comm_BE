const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: "https://bulma.io/images/placeholders/480x480.png"
    },
    description: String,
    sku: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    isSale: {
        type: Boolean,
        default: true
    },
    sizes: [
        {
            type: String
        }
    ],
    categories: [
        {
            type: String
        }
    ],
    colors: [
        {
            type: String
        }
    ],
    shoeGender: String,
    dateAdd: {
        type: Date,
        default: Date.now()
    },
    dateUpdate: {
        type: Date,
        default: Date.now()
    }
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);