'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    store: String,
    discount: Number,
    total: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}


});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;




