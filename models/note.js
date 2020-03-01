const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId 

// MongoDB Schema
const noteSchema = new Schema({
    id: ObjectId,
    title: { 
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 50
    },
    content: { 
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 200
    }
})

// Course Class
const Note = mongoose.model('Note', noteSchema)

// Validation=====================================================================

function validateNote(note) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(1).max(200).required()
    });
    return schema.validate(note);
}

module.exports.Note = Note
module.exports.validate = validateNote
module.exports.noteSchema = noteSchema