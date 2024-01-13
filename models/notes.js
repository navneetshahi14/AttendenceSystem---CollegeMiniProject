const mongoose = require('mongoose')

const notes = new mongoose.Schema({
    teacherId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        default:""
    }
})

const notesMark = mongoose.model('notes',notes)

module.exports = notesMark