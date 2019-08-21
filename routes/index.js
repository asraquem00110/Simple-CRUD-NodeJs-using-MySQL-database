var express = require('express')
var app = express()
var auth = require('../classes/authenticate')
var indexcontroller = require('../controllers/indexcontroller')

app.get('/',indexcontroller.getdisplay)
app.get('/blog/(:id)',indexcontroller.view)

module.exports = app;