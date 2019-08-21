

var authenticate = (req,res,next)=>{
    if(req.session && req.session.userID_session > 0)
        return next()
    else
        // return res.sendStatus(401)
    res.redirect('/')
}

var auth2 = (req,res,next)=>{
    if(req.session && req.session.usertype === "admin")
        return next()
    else
        return res.sendStatus(401)
}


module.exports = {authenticate,auth2}