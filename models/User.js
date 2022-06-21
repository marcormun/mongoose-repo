const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 10
    },
    role: {
        type: String,
        enum: ['user','admin','super_admin'],
        default: 'user'
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;