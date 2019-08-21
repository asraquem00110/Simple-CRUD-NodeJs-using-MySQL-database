
const Blog = require("../dataModel/blog")
const config = require("../classes/config")
var formidable = require('formidable')
var fs = require('fs')

const controller = {}

controller.removeblog = (req,res,next)=>{
	//console.log(req.body)
	let idno = req.body.idno
	//res.send(JSON.parse(JSON.stringify("ok")))

	var result = Blog.removeblog(idno)
	if(result){
		res.send(JSON.parse(JSON.stringify("ok")))
	}
}


controller.createblog =  (req,res,next)=>{

	var form = new formidable.IncomingForm();
		form.parse(req, (err, fields, files)=> {
		
			var post = {
				title: fields.blogtitle,
				body: fields.blogbody,
				img: files.filetoupload.name,
			}

			try{
				var result = Blog.createblog(post)
			}catch(err){
				console.log(err)
			throw err
			}

			if(result){
				var oldpath = files.filetoupload.path;
				console.log(oldpath);
				var newpath = './public/images/' + files.filetoupload.name;
					fs.readFile(oldpath, function (err, data) {
					if (err) throw err;
					console.log('File read!');

					// Write the file
						fs.writeFile(newpath, data, function (err) {
						if (err) throw err;
						res.end();
						console.log('File written!');
						});

						// Delete the file
						fs.unlink(oldpath, function (err) {
						if (err) throw err;
							res.redirect('../../admin/dashboard')
						});
					});
			}
			
		});
}


controller.updateblog = (req,res,next)=>{

	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files)=> {

		var post = {
			idno: fields.blogidno,
			title: fields.blogtitle,
			body: fields.blogbody,
			img: files.filetoupload.name,	
			oldimg: fields.blogoldimg,
		}

		var query = post.img == "" ? "UPDATE blog SET title = ?, body = ? WHERE idno =?" : "UPDATE blog SET title = ?, body = ?, img = ? WHERE idno = ?"

		if(post.img == ""){
			var postdata = [post.title,post.body,post.idno]
			var result = Blog.updateblog(query,postdata)
			if(result){
				res.redirect('../../admin/dashboard')
			}else{
				console.log("Something went wrong")
			}
			
		}else{
			var postdata = [post.title,post.body,post.img,post.idno]
			var result = Blog.updateblog(query,postdata)
			if(result){
				var oldpath = files.filetoupload.path;
				console.log(oldpath);
				var newpath = './public/images/' + files.filetoupload.name;
					fs.readFile(oldpath, function (err, data) {
					if (err) throw err;
					console.log('File read!');

					// Write the file
						fs.writeFile(newpath, data, function (err) {
						if (err) throw err;
						res.end();
						console.log('File written!');
						});

						// Delete the file
						fs.unlink(oldpath, function (err) {
						if (err) throw err;
						});

						fs.unlink(config.public.image + post.oldimg, (err)=> {
						if (err) throw err;
							res.redirect('../../admin/dashboard')
						});
					});
			}
		}




	})
}


module.exports = controller