
const Blog = require("../dataModel/blog")
const controller = {}


controller.getdisplay = async (req,res,next)=>{
	var blogsData = await Blog.getAll()
	res.render('index',{title: 'My First Nodejs',blogs: blogsData})
}


controller.view = async (req,res,next)=>{
	var blogData = await Blog.getData(req.params.id)
	res.render('blogview',{blog: blogData})
}

module.exports = controller