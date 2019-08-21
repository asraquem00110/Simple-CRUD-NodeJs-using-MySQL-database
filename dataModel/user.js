
const connection = require("../classes/dbconnection")


const User = {}


User.login = (userdata) =>{
			return new Promise((resolve,reject)=>{
   				connection.query("SELECT * FROM user WHERE username = ? AND pass_word =?",userdata,(err,rows,fields)=>{
				if(err) throw err
					if(rows === 'undefined'){
						reject(new Error("Error"))
					}else{
						resolve(rows)
					}
			})
   		})
}


module.exports = User