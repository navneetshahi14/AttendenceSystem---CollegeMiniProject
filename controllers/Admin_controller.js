const studentModal = require('../models/StudentModal')
const teacherModal = require('../models/TeacherModal')
const AnnounceModal = require('../models/AnnounceModal')
const adminModal = require('../models/AdminModal')
const mentorModal = require('../models/MentorModal')

const AdminRender = async(req,res) =>{
    try {
        
        const AdminId = req.params._id
        const Admin = await adminModal.findOne({_id:AdminId})
        const teacher = await teacherModal.find({})
        const Student = await studentModal.find({})

        
        res.render('Admin/Admin-Dashboard.ejs',{Admin:Admin,student:Student,teacher:teacher})

    } catch (error) {
        
    }
}

const AdminStudent = async(req,res) =>{
    try{

        const student = await studentModal.find({})
        const AdminId = req.params._id
        const Admin = await adminModal.findOne({_id:AdminId})

        res.render('Admin/Admin-Student.ejs',{student:student,Admin:Admin})

    }catch(err){
        console.log(err.message)
    }
}

const AdminTeacher = async(req,res) => {
    try {

        const teacher = await teacherModal.find({})
        const AdminId = req.params._id
        const Admin = await adminModal.findOne({_id:AdminId})

        res.render('Admin/Admin-Teacher.ejs',{teacher:teacher,Admin:Admin})

    } catch (error) {
        console.log(error.message)
    }
}

const AdminAnnounce = async(req,res) =>{
    try{

        const AdminId = req.params._id
        const Admin = await adminModal.findOne({_id:AdminId})
        const AdminAnnounce = await AnnounceModal.find({ ConversationId: AdminId })

        res.render('Admin/Admin-Announce.ejs',{Admin:Admin,announce:AdminAnnounce})

    }catch(err){
        console.log(err.message)
    }
}

const makeAnnounce = async(req,res) =>{
    try{

        const Id = req.params._id
        const ConversationId = req.body.ConversationId
        const title = req.body.title
        const detail = req.body.detail
        const date = req.body.date

        const Announce = new AnnounceModal({
            ConversationId:ConversationId,
            title:title,
            detail:detail,
            date:date
        })

        await Announce.save()
        res.redirect('/adminannounce/'+Id)

    }catch(err){
        console.log(err.message)
    }
}

const mentorManage = async(req,res) =>{
    try{

        const Id = req.params._id
        const sectionfind = req.query.sectionfind
        const teacherfind = req.query.teacherfind

        const Admin = await adminModal.findOne({_id:Id})
        const Teachers = await teacherModal.find()
        const dis = await teacherModal.findOne({_id: teacherfind})
        // console.log(dis.length)

        // const section = req.body.section
        const Student = await studentModal.find({section : sectionfind})

        res.render('Admin/Admin-mentor.ejs',{Admin:Admin,Student:Student,Teacher:Teachers,dis:dis,section:sectionfind})

    }catch(err){
        console.log(err.message)
    }
}

const makeMentor = async(req,res)=>{
    try{
 
        const Id = req.params._id
        const teacherId = req.body.teacherId
        const section = req.body.section
        const details = req.body
        // console.log(details)
        delete details['teacherName']
        delete details['teacherId']
        delete details['section']
        
        const data = Object.keys(details)
        // console.log(data)
        // console.log(typeof(data))

        const mentor = new mentorModal({
            mentorId:teacherId,
            section:section,
            students:data
        })
  
        const teacherfindupdate = await teacherModal.findByIdAndUpdate({ _id:teacherId },{
            $set:{
                mentor:section
            }
        })

        await mentor.save()

        res.redirect('/adminMentor/'+Id)

    }catch(err){
        console.log(err.message)
    }
}



module.exports = {
    AdminRender,
    AdminStudent,
    AdminTeacher,
    AdminAnnounce,
    makeAnnounce,
    mentorManage,
    makeMentor,


}