const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
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
    type:{
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
})

const Admin = mongoose.model('Admin',AdminSchema)
module.exports = Admin
