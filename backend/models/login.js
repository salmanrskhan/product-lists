const mongoose = require('mongoose');
// const express = require('express');

const Login = mongoose.model('logins', {
    name: { type: String },
    email: { type: String },
    password: {
        type: String,
        default: "12345"
    }
})


// other method ====================
// const loginSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//         // unique: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true,
//         default: "12345"
//     }
// })

// const Logins= new mongoose.model("login", loginSchema);
// module.exports = Name
// ==========================



module.exports = Login;