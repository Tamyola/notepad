const mongoose = require('mongoose');
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    content: String,
}, { timestamps: {createdAt: "dateCreated", updatedAt: "dateUpdated"}});

const NotesModel = mongoose.model("notes", NotesSchema)
module.exports = { NotesModel }