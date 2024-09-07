const mongoose = require('mongoose')

const teachermessage = new mongoose.Schema({
    teacherId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        reqiured:true
    },
    date:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

const messageTeacher = mongoose.model('messageTeacher',teachermessage)
module.exports = messageTeacher