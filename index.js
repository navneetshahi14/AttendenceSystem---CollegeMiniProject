const express = require('express')
const app = express()
const mongooseConnect = require('./database/db')

// For TeacherRouter
const TeacherRouter = require('./routes/TeacherRouter.js')
app.use('/',TeacherRouter)

const StudentRouter = require('./routes/StudentRouter.js')
app.use('/',StudentRouter)

const AdminRouter = require('./routes/AdminRouter.js')
app.use('/',AdminRouter)

// dataBase connected
mongooseConnect()

// localhost Connected
app.listen('5000',()=>{
    try {
        console.log('Port No. at 5000')
        
    } catch (error) {
        console.log(error.message)
    }
})


