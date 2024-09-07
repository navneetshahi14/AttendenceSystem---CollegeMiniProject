const TeacherModal = require('../models/TeacherModal')
const StudentModal = require('../models/StudentModal')
const AdminModal = require('../models/AdminModal')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')
const config = require('../config/config')

const securePassword = async (password) =>{
    try{

        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash

    }catch(err){
        console.log(err.message)
    }
}

const sendReset = async(name,email,token)=>{
    try {
        const transport = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.EmailUser,
                pass:config.emailPassword
            }
        })

        const mailoption ={
            from : config.EmailUser,
            to : email,
            subject : "Reset Password",
            html : "<p> Hii, " + name + 'Please click here to <<a href="http://127.0.0.1:5000/reset-password?token='+token+'">Reset</a> your password' 
        }

        transport.sendMail(mailoption,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log("email has been send -->", info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

const LoadRegistration = async(req,res) =>{
    try{

        res.render('registration',{message:""})

    }catch(err){
        console.log(err.message)
    }
}

const LoadLogin = async(req,res) =>{
    try {
        
        res.render('login',{message:""})

    } catch (error) {
        console.log(error.message)
    }
}

const Registration = async(req,res) =>{
    try {


        const email = req.body.email
        const name = req.body.name
        const section = req.body.section
        const password = await securePassword(req.body.password)
        const type = req.body.type
        const rollno = req.body.rollno
        const IT1 = req.body.it1
        const IT2 = req.body.it2
        const IT3 = req.body.it3
        const subject1 = req.body.sub1
        const subject2 = req.body.sub2
        const subject3 = req.body.sub3
        const subject4 = req.body.sub4
        const subject5 = req.body.sub5
        const subject6 = req.body.sub6
        const profile = req.body.image
        
        const TeacherFind = await TeacherModal.findOne({email:email})
        const StudentFind = await StudentModal.findOne({email:email})
        const AdminFind = await AdminModal.findOne({email:email})

        if(!TeacherFind && !StudentFind && !AdminFind){
            if(type === "isTeacher"){
                const Teacher = new TeacherModal({
                    name:name,
                    email:email,
                    password:password,
                    type:type,
                    IT1:IT1,
                    IT2:IT2,
                    IT3:IT3,
                    profile:profile,
                    notes:{}
                })
                await Teacher.save()

                res.redirect('/attendence/'+Teacher._id)
            }
            else if(type === "isStudent"){
                const Student = new StudentModal({
                    name:name,
                    email:email,
                    rollNo:rollno,
                    password:password,
                    section:section,
                    type:type,
                    profile:profile
                })
    
                await Student.save()
                res.redirect('/studentProfile/'+Student._id)
            }
            else if(type === "isAdmin"){
                const Admin = new AdminModal({
                    name:name,
                    email:email,
                    password:password,
                    type:type,
                    profile:profile
                })

                await Admin.save()
                res.redirect('/admin/'+Admin._id)
            }
        }
        else{
            res.render("registration",{message:"User Exists"})
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

const Login = async(req,res) =>{
    try{

        const email = req.body.email
        const rollno = req.body.rollno
        const password = req.body.password

        const Teacher = await TeacherModal.findOne({email:email})
        const Student = await StudentModal.findOne({rollNo:rollno})
        const Admin = await AdminModal.findOne({email:email})

        if(Teacher){

            const teacherpassmatch = await bcrypt.compare(password,Teacher.password)
            
            if(teacherpassmatch){
                res.redirect('/attendence/'+Teacher._id)
            }else{
                res.render('login',{message:"Wrong Credentials"})
            }
        }else if(Student){
            const studentpassmatch = await bcrypt.compare(password,Student.password)

            if(studentpassmatch){
                res.redirect('/studentProfile/'+Student._id)
            }else{
                res.render('login',{message:"Wrong Credentials"})
            }
        }
        else if(Admin){
            const adminpass = await bcrypt.compare(password,Admin.password)
            if(adminpass){
                res.redirect('/admin/'+Admin._id)
            }else{
                res.render('login',{message:"Wrong Credentials"})
            }
        }
        else{
            res.render('login',{message:"No User Exist"})
        }

    }catch(err){
        console.log(err.message)
    }
}

const forgetLoad = async(req,res)=>{
    try {
        res.render('forget-password',{message:" "})
    } catch (error) {
        console.log(error.message)
    }
}

const forgetpasswordVerify = async(req,res) =>{
    try{

        const email = req.body.email
        const teacherdetails = await TeacherModal.findOne({email:email})
        const studentdetails = await StudentModal.findOne({email:email})

        if(teacherdetails){

            const randomString = randomstring.generate()

            await TeacherModal.updateOne({email:email},{$set:{token:randomString}})
            sendReset(teacherdetails.name,teacherdetails.email,randomString)
            console.log("hi")
            res.render('forget-password',{message:"pls check your email"})

        }
        else if(studentdetails){
            const randomString = randomstring.generate()

            await StudentModal.updateOne({email:email},{$set:{token:randomString}})
            sendReset(studentdetails.name,studentdetails.email,randomString)
            console.log("hello")
            res.render('forget-password',{message:"pls check your email"})

        }
        else{
            res.render('forget-password',{ message : "User Email is incorrect" })
            console.log("bye")
        }


    }catch(err){
        console.log(err.message)
    }
}

const resetPassLoad = async(req,res) =>{
    try{
        const token = req.query.token
        const teachertokendata = await TeacherModal.findOne({token:token})
        const studenttokendata = await StudentModal.findOne({token:token})

        if(teachertokendata){
            res.render('reset-password', {message:" ",userid:teachertokendata._id})
        }else if(studenttokendata){
            res.render('reset-password', {message:" ",userid:studenttokendata._id})
        }else(
            res.send('404')
        )

    }catch(error){
        console.log(error.message)
    }
}

const resetPassword = async(req,res) =>{
    try{

        const password = req.body.password
        const user_id = req.body.userid

        const secure = await securePassword(password)
        const teacher = await TeacherModal.findOne({_id:user_id})
        const student = await StudentModal.findOne({_id:user_id})

        if(teacher){
            await TeacherModal.findByIdAndUpdate({_id:user_id},{$set:{password:secure}})
            res.redirect('/login')
        }
        else if(student){
            await StudentModal.findByIdAndUpdate({_id:user_id},{$set:{password:secure}})
            res.redirect('/login')
        }else{
            res.render('reset-password',{message:"Something wrong"})
        }



    }catch(err){
        console.log(err.message)
    }
}

const uploadpostimage = async(req,res)=>{
    try {
        
        let imagePath = "/image"
        imagePath  = imagePath+'/'+req.file.filename
        res.send({success:true,msg:"image upload successfully",path:imagePath})

    } catch (error) {
        console.log(error.message)
        res.send({success:false,msg:error.message})
    }
}

module.exports = {
    LoadLogin,
    Login,
    LoadRegistration,
    Registration,
    forgetLoad,
    forgetpasswordVerify,
    resetPassword,
    resetPassLoad,
    uploadpostimage



    
}