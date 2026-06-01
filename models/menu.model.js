const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String, required : true},
    type:{type: String}
})
module.exports = mongoose.model('menu', menuSchema)