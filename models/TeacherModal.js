const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:""
    },
    profile:{
        type:String,
        required:true
    },
    notes:{
        type:Object,
        default:{}
    },
    type:{
        type:String,
        required:true
    },
    IT1:{
        type:String,
        required:true
    },
    IT2:{
        type:String,
        required:true
    },
    IT3:{
        type:String,
        required:true
    }
})

const Teacher = mongoose.model('teacher',TeacherSchema)
module.exports = Teacher
