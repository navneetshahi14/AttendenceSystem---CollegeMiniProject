const express = require('express')
const Admin_Router = express()

const AdminController = require('../controllers/Admin_controller')

Admin_Router.get('/admin/:_id',AdminController.AdminRender)
Admin_Router.get('/adminstudent/:_id',AdminController.AdminStudent)
Admin_Router.get('/adminteacher/:_id',AdminController.AdminTeacher)
Admin_Router.get('/adminannounce/:_id',AdminController.AdminAnnounce)

Admin_Router.post('/adminannounce/:_id',AdminController.makeAnnounce)

Admin_Router.get('/adminMentor/:_id',AdminController.mentorManage)

Admin_Router.post('/adminMentor/:_id',AdminController.makeMentor)

module.exports = Admin_Router