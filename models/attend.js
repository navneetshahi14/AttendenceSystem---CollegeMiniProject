const mongoose = require('mongoose')

const attendence = new mongoose.Schema({},{strict : false})

const attendenceMark = mongoose.model('attendence',attendence)

module.exports = attendenceMark