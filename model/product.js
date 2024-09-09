const { url } = require('inspector');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String  },
    price: { type: String },
    description: { type: String},
    quantity: { type: Number},
    Image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);