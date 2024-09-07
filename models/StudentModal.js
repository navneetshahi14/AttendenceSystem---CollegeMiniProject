const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    rollNo:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    attendence:{
        type:Number,
        default:""
    },
    type:{
        type:String,
        required:true
    },
    teacher:{
        type:Object,
        default:{}
    },
    token:{
        type:String,
        default:""
    }
})

const Student = mongoose.model('student',StudentSchema)
module.exports = Student
