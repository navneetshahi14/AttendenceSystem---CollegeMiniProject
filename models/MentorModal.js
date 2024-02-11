const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    mentorId:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    students:{
        type:Array,
        required:true
    }
})

const mentor = mongoose.model('mentor',mentorSchema)

module.exports = mentor