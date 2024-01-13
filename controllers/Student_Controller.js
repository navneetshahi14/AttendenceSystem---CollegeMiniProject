const TeacherModal = require('../models/TeacherModal')
const attend = require('../models/attend')
const StudentModal = require('../models/StudentModal')

const StudentLoad = async(req,res) =>{
    try{
        
        const _id = req.params._id
        const present = 'P'
        const studentDetails = await StudentModal.findOne({_id:_id})
        const section = studentDetails.section
        const rollno = studentDetails.rollNo

        const Coateacher = {}
        Coateacher[section] = "Coa"
        const Coateacherfind = await TeacherModal.findOne(Coateacher)

        const Tcteacher = {}
        Tcteacher[section] = "Tc"
        const Tcteacherfind = await TeacherModal.findOne(Tcteacher)

        const Dsteacher = {}
        Dsteacher[section] = "Ds"
        const Dsteacherfind = await TeacherModal.findOne(Dsteacher)

        const Dstlteacher = {}
        Dstlteacher[section] = "Dstl"
        const Dstlteacherfind = await TeacherModal.findOne(Dstlteacher)

        const Eseteacher = {}
        Eseteacher[section] = "Ese"
        const Eseteacherfind = await TeacherModal.findOne(Eseteacher)

        const Csteacher = {}
        Csteacher[section] = "Cs"
        const Csteacherfind = await TeacherModal.findOne(Csteacher)

        const rollString = parseInt(rollno)
        const attendance = await attend.find({section:section})
        const Coa = await attend.find({subject:"Coa",section:section})
        const Tc = await attend.find({subject:"Tc",section:section})
        const Ds = await attend.find({subject:"Ds",section:section})
        const Dstl = await attend.find({subject:"Dstl",section:section})
        const Ese = await attend.find({subject:"Ese",section:section})
        const Cs = await attend.find({subject:"Cs",section:section})

        const Coaquery = {
            section:section,
            subject:"Coa"
        }
        Coaquery[rollString] = present
        const CoaAttend = await attend.find(Coaquery)
        
        const Tcquery = {
            section:section,
            subject:"Tc"
        }
        Tcquery[rollString]= present
        const TcAttend = await attend.find(Tcquery)

        const Dsquery = {
            section:section,
            subject:"Ds"
        }
        Dsquery[rollString] = present
        const DsAttend  = await attend.find(Dsquery)

        const Dstlquery = {
            section:section,
            subject:"Dstl"
        }
        Dstlquery[rollString] = present
        const DstlAttend = await attend.find(Dstlquery)

        const Csquery = {
            section:section,
            subject:"Cs"
        }
        Csquery[rollString] = present
        const CsAttend = await attend.find(Csquery)

        const Esequery = {
            section:section,
            subject:"Ese"
        }
        Esequery[rollString] = present
        const EseAttend = await attend.find(Esequery)

        
        

        res.render('student/student-profile',{student:studentDetails,attendence:attendance,Coa:Coa,Tc:Tc,Ds:Ds,Dstl:Dstl,Cs:Cs,Ese:Ese,CoaAttend:CoaAttend,TcAttend:TcAttend,DsAttend:DsAttend,DstlAttend:DstlAttend,CsAttend:CsAttend,EseAttend:EseAttend,Coateacher:Coateacherfind,Tcteacher:Tcteacherfind,Dsteacher:Dsteacherfind,Dstlteacher:Dstlteacherfind,Eseteacher:Eseteacherfind,Csteacher:Csteacherfind})

    }catch(err){
        console.log(err.message)
    }
}

const studentAttendence = async(req,res) =>{
    try{
        const _id = req.params._id
        const studentDetails = await StudentModal.findOne({ _id : _id })
        console.log(_id)
        res.render('student/student-attendence',{student:studentDetails})
    }catch(err){
        console.log(err.message)
    }
}


module.exports = {
    StudentLoad,
    studentAttendence,


    
}