const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {type : mongoose.Schema.Types.ObjectId, ref: 'user'},
    items: {type: Array , default:[]},
    menuId: {type: mongoose.Schema.Types.ObjectId, ref: 'menu'},
    quantity: {type: Number, default: 1 },
    totalPrice: {type: Number, default: 0 }
})
module.exports = mongoose.model('cart', cartSchema)