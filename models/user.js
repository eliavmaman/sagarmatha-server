'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]

});


const User = mongoose.model('User', UserSchema);
module.exports = User;




