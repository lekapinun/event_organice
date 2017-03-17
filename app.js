var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var pool = mysql.createPool
({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'event_organice'
});

app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.get('/',function(req,res)
{
	sess = req.session;
	if(sess.email) 
	{
	    res.render('Hello.html');
	}
	else 
	{
	    res.render('login.html');
	}
});

app.post('/login',function(req,res)
{
	var form = req.body;
	// console.log("SELECT * FROM `MEMBER` WHERE `E-MAIL` = '" + form.email + "' AND `PASSWORD` = '" + form.pass + "'");
	pool.getConnection(function(err,connection)
	{ 
        connection.query("SELECT * FROM `MEMBER` WHERE `E-MAIL` = '" + form.email + "' AND `PASSWORD` = '" + form.pass + "'",function(err,rows){
            connection.release();
            if(rows.length != 0) 
            {
                sess = req.session;
  				sess.email=req.body.email;
  				sess.member_id = rows[0].MEMBER_ID;
  				res.end('done');
            }
            else
            {
            	console.log('xxx');
            	res.end('error');
            }           
        });
    });
  
});

app.get('/logout',function(req,res)
{
	req.session.destroy(function(err) 
	{
	  if(err) 
	  {
	    console.log(err);
	  } 
	  else 
	  {
	    res.redirect('/');
	  }
	});
});

// app.get('/member/:id',function(req,res)
// {
//         pool.getConnection(function(err,connection)
//         {
//         // if (err) {
//         //   res.json({"code" : 100, "status" : "Error in connection database"});
//         //   return;
//         // }   
//      	var mem_id = req.params.id;
//         connection.query("select * from member where member_id =" + mem_id,function(err,rows)
//         {
//             connection.release();
//             if(!err) 
//             {
//                 res.json(rows);
//             }           
//         });

//         // connection.on('error', function(err) {      
//         //       res.json({"code" : 100, "status" : "Error in connection database"});
//         //       return;     
//         // });
//   });
// });

app.get('/member',function(req,res)
{
	sess = req.session;
	//console.log(sess.member_id);
	if(sess.member_id) 
	{
	    pool.getConnection(function(err,connection)
        {
	     	var mem_id = req.params.id;
	        connection.query("select * from `member` where `member_id` = '" + sess.member_id + "'",function(err,rows)
	        {
	            connection.release();
	            if(!err) 
	            {
	                res.json(rows);
	            }           
	        });
  		});
	}
	else 
	{
	    res.render('login.html');
	}
});

app.get('/AllEvent',function(req,res)
{
	sess = req.session;
	//console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
	        connection.query("select * from `event` where `TIME_START_E` > NOW() ORDER BY `TIME_START_E`" ,function(err,rows)
	        {
	            connection.release();
	            if(!err) 
	            {
	                res.json(rows);
	            }           
	        });
  		});
	// }
	// else 
	// {
	//     res.render('login.html');
	// }
});



app.listen(5555);