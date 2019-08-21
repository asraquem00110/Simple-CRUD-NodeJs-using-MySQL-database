var express = require('express')
var app = express()
var auth = require('../classes/authenticate')
var admincontroller = require('../controllers/admincontroller')

app.get('/login',admincontroller.index)

app.post('/login',admincontroller.login)

app.get('/dashboard',auth.authenticate,auth.auth2,admincontroller.dashboard)

app.get('/logout',(req,res,next)=>{
	   req.session.destroy()
	   res.redirect('/admin/dashboard')
})

app.get('/create',auth.authenticate,(req,res,next)=>{
	res.render('createblog')
})


app.get('/editblog/(:idno)',auth.authenticate,auth.auth2,admincontroller.editblog)





module.exports = app