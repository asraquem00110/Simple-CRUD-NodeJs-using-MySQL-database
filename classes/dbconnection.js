const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'simpleblog',
  port: 3306
});


module.exports = connection
