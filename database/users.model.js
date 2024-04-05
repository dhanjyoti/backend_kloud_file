const mongoose = require('mongoose');

// Define a schema
const todoSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    password: String,
});

// Define a model
const User = mongoose.model('User', todoSchema);

module.exports = User;
