const mongoose = require('mongoose')

const oderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    resturentId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    item : {type: Array, required: true},
    totalamount : {type: Number, required: true},
    status: {type: String, enum: ['pending', 'accepted', 'rejected', 'deleverd', 'cancelled','out for delivery'], default: 'pending'},
    diliveryaddress: {type: String, required: true},
    oderedAt: {type: Date, default: Date.now}

})

module.exports = new mongoose.model('oder', oderSchema)


