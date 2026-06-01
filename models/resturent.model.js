const mongoose = require('mongoose');

const resSchema = new mongoose.Schema({
    name:{type: String, required: true },
    owner:{type: mongoose.Schema.Types.ObjectId, ref: 'resturant_owner', required: true},
    address:{type: String, required: true},
    cusine:{type: String},
    menu:{type: mongoose.Schema.Types.ObjectId, ref: 'food'}
})
    
module.exports = mongoose.model('resturant', resSchema)