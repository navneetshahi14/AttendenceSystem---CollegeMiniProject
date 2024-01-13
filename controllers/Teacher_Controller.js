const TeacherModal = require('../models/TeacherModal')
const StudentModal = require('../models/StudentModal')
const {ObjectId} = require('mongodb')
const attend  =  require('../models/attend')
const note = require('../models/notes')

const Attendence = async(req,res) =>{
    try{

        const id = req.params.id;
        const info = await TeacherModal.findOne({_id:id})
        const section = req.query.Section
        const studentFind = await StudentModal.find({section:section})
        // console.log(studentFind)

        res.render('teacher/attendence',{Teacher:info,student:studentFind,section:section})

    }catch(err){
        console.log(err.message)
    }
}


const notes = async(req,res) =>{
    try{
        const id = req.params.id;
        const info = await TeacherModal.findOne({ _id : id })
        const notesfind = await note.find({ teacherId : id})
        // console.log(notesfind)
        res.render('teacher/notes',{Teacher:info,notes:notesfind})


    }catch(err){
        console.log(err)
    }
}

const MarkAttendence = async(req,res) =>{
    try{

        const id = req.params.id
        const subject = req.body.subject
        const data = req.body
        const form = new attend(data)

        await form.save()
        res.redirect('/attendence/'+id)



    }catch(err){
        console.log(err.message)
    }
}

const uploadNotes = async(req,res) =>{
    try{

        let notesPath = "/notes"
        notesPath  = notesPath+'/'+req.file.filename
        res.send({success:true,msg:"pdf upload successfully",path:notesPath})

    }catch(err){
        console.log(err.message)
    }
}

const uploadTitleNotes = async(req,res)=>{
    try{

        const _id = req.body.teacherId
        const title = req.body.title
        const notes = req.body.notes

        console.log(req.body)

        const notesdata = new note({
            teacherId:_id,
            title:title,
            notes:notes
        })
        const success = await notesdata.save()
        

        if(success){
            res.redirect('/notes/'+_id)
        }
        else{
            res.send({success:false,msg:"notes upload successfully"})
        }
        


    }catch(err){
        console.log(err.message)
    }
}

const notesDelete = async(req,res)=>{
    try{
        const Id = req.body.teacherId
        const noteId = req.body.noteId
        const notesdelete = await note.deleteOne({ _id:noteId })

        if(notesdelete){
            res.redirect('/notes/'+Id)
        }
        else{
            res.send("Failed to delete")
        }

    }catch(err){
        console.log(err.message)
    }
}

const notesUpdate = async(req,res)=>{
    try{
        const notesID = req.body.noteId
        const teacherId = req.body.teacherId
        const title = req.body.title
        const noteUpdate = await note.findByIdAndUpdate({_id:notesID},{
            $set:{
                title:title
            }
        })

        if(noteUpdate){
            res.redirect('/notes/'+teacherId)
        }else{
            res.send('failed')
        }

    }catch(err){
        console.log(err.message)
    }
}

module.exports = {
    Attendence,
    notes,
    MarkAttendence,
    uploadNotes,
    uploadTitleNotes,
    notesDelete,
    notesUpdate,
    
}