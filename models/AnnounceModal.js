const mongoose = require('mongoose')

const AnnounceSchema = new mongoose.Schema({
    ConversationId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    date:{
        type:String,
        reqiured:true
    }
})

const Announce = mongoose.model('Announce',AnnounceSchema)

module.exports = Announce