const mysql = require('mysql2')

const pool = mysql.createPooll({
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DBNAME,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

pool.getConnection((err, conn) =>{
    if(err) console.log(err)
    console.log("connection succesfully")
})

module.exports = pool.promise()