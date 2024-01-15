const express = require('express')
const Student_Router = express()
const session = require('express-session')

const bodyParser = require('body-parser')
Student_Router.use(bodyParser.json())
Student_Router.use(bodyParser.urlencoded({extended:true}))

const config = require('../config/config')

Student_Router.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}))

Student_Router.set('view engine','ejs')
Student_Router.set('views','./views')

const studentController = require('../controllers/Student_Controller')

Student_Router.get('/studentProfile/:_id',studentController.StudentLoad)

Student_Router.get('/studentAttendence/:_id',studentController.studentAttendence)

Student_Router.get('/studentNotes/:_id',studentController.studentNotes)

module.exports = Student_Router