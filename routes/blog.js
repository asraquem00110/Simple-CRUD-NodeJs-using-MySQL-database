
const express = require("express")
const app = express()
var auth = require('../classes/authenticate')

var blogcontroller = require('../controllers/blogcontroller')

app.delete('/removeblog',auth.authenticate,blogcontroller.removeblog)

app.post('/create',auth.authenticate,blogcontroller.createblog)

app.post('/update',auth.authenticate,blogcontroller.updateblog)


module.exports = app