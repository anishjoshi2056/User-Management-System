const mysql = require('mysql');
const { connect } = require('../routes/user');
//Pool connection
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
//Viewing all the User
exports.view = (req, res) => {
    //Connect to the DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * FROM user WHERE status = "active"',(err,rows)=> {
            //When done with the connection,release it
            connection.release();
            if(!err){
               res.render('home',{rows}); 
            }else{
                console.log(err)
            }
            console.log('The data from the user table :\n',rows)
        });
    });
}
//Find user by Search
exports.find = (req, res) => {
//Connect to the DB
pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log('connected as id ' + connection.threadId);

    const searchTerm = req.body.search;

    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',['%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows)=> {
        //When done with the connection,release it
        connection.release();
        if(!err){
           res.render('home',{rows}); 
        }else{
            console.log(err)
        }
        console.log('The data from the user table :\n',rows)
    });
});
}