var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();
app.use(express.static('views'))
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'event_organice'
});


app.get("/member",function(req,res){
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
     
        connection.query("select * from member",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
});

app.listen(5555);


// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'event_organice'
// });

// connection.connect();

// connection.query('SELECT * from member', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

// connection.end();

// var express    = require("express");
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'event_organice'
// });
// var app = express();

// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");    
// } else {
//     console.log("Error connecting database ... nn");    
// }
// });

// app.get("/",function(req,res){
//   console.log("D");    
//     connection.query('SELECT * from member', function(err, rows, fields) {
//     connection.end();
//       if (!err)
//         console.log('The solution is: ', rows);
//       else
//         console.log('Error while performing Query.');
//       });
// });

// app.listen(3000);