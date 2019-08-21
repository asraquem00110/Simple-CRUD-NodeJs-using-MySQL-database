

const connection = require("../classes/dbconnection")
var fs = require('fs')
const config = require("../classes/config")
const Blog = {}


Blog.getAll = ()=>{
	return new Promise((resolve,reject)=>{
		connection.query("SELECT * FROM blog ORDER BY title ASC",(err,rows,fields)=>{
			if(err) throw err
				if(err){
					reject("Something went wrong")
					console.log("Something went Wrong!!")
				}else{
					resolve(rows)
				}
		})
	})
}

Blog.getData = (idno)=>{
	return new Promise((resolve,reject)=>{
		connection.query("SELECT * FROM blog WHERE idno = ?",[idno],(err,rows,fields)=>{
			if(err) throw err
				if(err){
					reject("Something went wrong")
					console.log("Something went Wrong!!")
				}else{
					resolve(rows)
				}
		})
	})
}

Blog.removeblog =  (idno)=>{
	return new Promise( async (resolve,reject)=>{

		var postdata = await Blog.getData(idno)
		let imagepath = postdata[0].img

		connection.query("DELETE FROM blog WHERE idno = ?",[idno],(err,rows,fields)=>{
			if(err) throw err
				if(err){
					reject("Something went wrong")
					console.log("Something went Wrong!!")
				}else{
					fs.unlink(config.public.image + imagepath, (err)=> {
					if (err) throw err;
						resolve(1)
					});
				}
		})
	})
}

Blog.createblog = (post) =>{
	return new Promise((resolve,reject)=>{
		connection.query("INSERT INTO blog (title,body,img) VALUES (?,?,?)",[post.title,post.body,post.img],(err,rows,fields)=>{
			if(err) throw err
				if(err){
					reject("Something went wrong")
					console.log("Something went Wrong!!")
				}else{
					resolve(1)
				}
		})
	})
}

Blog.updateblog = (query,postdata)=>{
	return new Promise((resolve,reject)=>{
		connection.query(query,postdata,(err,rows,fields)=>{
			if(err) throw err
				if(err){
					reject("Something went wrong")
					console.log("Something went Wrong!!")
				}else{
					resolve(1)
				}
		})
	})
}


module.exports = Blog