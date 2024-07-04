const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    psw: String,
}, { timestamps: {createdAt: "dateCreated", updatedAt: "dateUpdated"}})

const UserModel = mongoose.model("users", UserSchema)
module.exports = { UserModel }