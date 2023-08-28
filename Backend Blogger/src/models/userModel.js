/* eslint-disable no-undef */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: 'String',
        required: true
    },
    lname: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    phone: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    },
    title: {
        type: 'String',
        enum: ['Mr', 'Mrs', 'Miss'],
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);