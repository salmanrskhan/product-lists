const mongoose = require('mongoose');

const Product = mongoose.model('products', {
    name: { type: String },
    file: { type: String },
    price: { type: Number },
    descp: { type: String },
})

module.exports = Product;