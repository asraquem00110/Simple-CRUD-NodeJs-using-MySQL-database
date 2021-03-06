var express = require('express')
var app = express()

var config = require('./classes/config')

app.set('view engine', 'ejs')

var index = require('./routes/index')
var admin = require('./routes/admin')
var blog = require('./routes/blog')


var expressValidator = require('express-validator')
app.use(expressValidator())
 
 

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
 
var methodOverride = require('method-override')
 

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))



var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))
app.use(flash())


app.use((req,res,next)=>{
    res.locals.userid = req.session.userID_session
    res.locals.fullname = req.session.userFullName_session
    next()
})

 

app.use('/', index)
app.use('/admin',admin)
app.use('/blog',blog)


app.use('/public', express.static('public'))
 
app.listen(config.server.port, function(){
    console.log(`Server running at port ${config.server.port}: http://127.0.0.1:${config.server.port}`)
})
 