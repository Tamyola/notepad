const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    psw: String,
});

const AdminModel = mongoose.model("admin", AdminSchema)
module.exports = { AdminModel }