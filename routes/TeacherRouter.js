const express = require('express')
const Teacher_Router = express()
const multer = require('multer')
const session = require('express-session')

const bodyParser = require('body-parser')
Teacher_Router.use(bodyParser.json())
Teacher_Router.use(bodyParser.urlencoded({extended:true}))

const config = require("../config/config")

Teacher_Router.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}))

Teacher_Router.set('view engine','ejs')
Teacher_Router.set('views','./views')

const path = require('path')

const intial_path = path.join(__dirname,'../public/image')
const notes_path = path.join(__dirname,'../public/notes')
Teacher_Router.use(express.static('public'))

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,intial_path)
    },
    filename:function(req,file,cb){
        const name = Date.now() +"-"+file.originalname
        cb(null,name)
    }
})
const storage_notes = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,notes_path)
    },
    filename:function(req,file,cb){
        const name = Date.now() +"-"+file.originalname
        cb(null,name)
    }
})

const upload_image = multer({storage:storage})
const upload_notes = multer({storage:storage_notes})

const auth = require('../controllers/AuthController')
const TeacherController = require('../controllers/Teacher_Controller')

// Registration Router
Teacher_Router.get('/registration',auth.LoadRegistration)
Teacher_Router.post('/registration',auth.Registration)

// Login router
Teacher_Router.get('/login',auth.LoadLogin)
Teacher_Router.post('/login',auth.Login)

// forgetpassword
Teacher_Router.get('/forget-Password',auth.forgetLoad)
Teacher_Router.post('/forget-Password',auth.forgetpasswordVerify)


// reset password
Teacher_Router.get('/reset-password',auth.resetPassLoad)
Teacher_Router.post('/reset-password',auth.resetPassword)

// Attendence
Teacher_Router.get('/attendence/:id',TeacherController.Attendence)
// notes
Teacher_Router.get('/notes/:id',TeacherController.notes)

// markAttendence
Teacher_Router.post('/attendence/:id',TeacherController.MarkAttendence)


// loadimage
Teacher_Router.post('/upload-image',upload_image.single('profile'),auth.uploadpostimage)
// loadnotes
Teacher_Router.post('/upload-notes',upload_notes.single('notes'),TeacherController.uploadNotes)

// fulltitlednotes
Teacher_Router.post('/upload-titled-notes',TeacherController.uploadTitleNotes)

// notesDelete
Teacher_Router.post('/delete-notes',TeacherController.notesDelete)
// notesUpdate
Teacher_Router.post('/update-notes',TeacherController.notesUpdate)

Teacher_Router.get('/Teacher-message/:id',TeacherController.messagePanel)

Teacher_Router.post('/teacherpost',TeacherController.makeMessage)


module.exports = Teacher_Router