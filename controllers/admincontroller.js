

const controller = {}
const User = require('../dataModel/user')
const Blog = require('../dataModel/blog')

controller.index = async (req,res,next)=>{  

	if(req.session && req.session.userID_session > 0){
		res.redirect('/admin/dashboard')
	}else{
		res.render('admin/login',{title: 'Admin Login Page'})
	}
	
}


// controller.dashboard = async (req,res,next)=>{
// 	var blogsData = await Blog.getAll()
// 	res.render('admin/dashboard',{blogs: blogsData})
// }

controller.dashboard = (req,res,next)=>{
	Blog.getAll().then((blogsData)=>{
		res.render('admin/dashboard',{blogs: blogsData})
	}).catch((err)=>{
		console.log(err)
	})
}

controller.login = async (req,res,next)=>{
		var user = {
			//name: req.param("username"),
			name: req.sanitize('username').escape().trim(),
			pwd: req.sanitize('pwd').escape().trim(),
		}
		var userdata = [user.name,user.pwd]
		try{
			var rows = await User.login(userdata)
		}catch(err){
			console.log(err)
			throw err
		}
		
		if(rows.length > 0){
				req.session.userID_session = rows[0].idno
				req.session.userFullName_session = rows[0].fullname
				req.session.usertype = rows[0].usertype
				res.redirect('/admin/login')
		}else{
			console.log("No Record found")
			res.render('admin/login',{message: 'No Record found'})
		}
}


controller.editblog = async (req,res,next)=>{

	let idno = req.params.idno

	try{
		let blogdata = await Blog.getData(idno)
		res.render('editblog',{blog: blogdata})
	}catch(err){
		throw err
	}
	



}


module.exports = controller