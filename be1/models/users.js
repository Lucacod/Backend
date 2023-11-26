const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        enum: ["user", "admin", "editor"],
        default: "user"
    }
}, { timestamps: true, strict: true})


module.exports = mongoose.model('userModel', UserSchema, 'users')