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
	    res.render('./home/home.html');
	}
});

app.post('/login',function(req,res)
{
	console.log('login');
	var form = req.body;
	// console.log("SELECT * FROM `MEMBER` WHERE `E-MAIL` = '" + form.email + "' AND `PASSWORD` = '" + form.pass + "'");
	pool.getConnection(function(err,connection)
	{ 
        connection.query("SELECT * FROM `MEMBER` WHERE `E-MAIL` = '" + form.email + "' AND `PASSWORD` = '" + form.pass + "'",function(err,rows){
            //connection.release();
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

// app.get('/AllEvent/:test',function(req,res)
// {
// 	sess = req.session;
// 	// console.log(sess);
// 	// if(sess.member_id) 
// 	// {
// 	    pool.getConnection(function(err,connection)
//         {
//         	if(req.params.test == 1)
//         	{
// 				var datetime  = new Date().getTime();
// 		        connection.query("select * from `event` where `TIME_START_E` > "  + datetime + " ORDER BY `TIME_START_E`" ,function(err,rows)
// 		        {
// 		            //connection.release();
// 		            if(!err) 
// 		            {
// 		                res.json(rows);
// 		            }           
// 		        });
//         	}
//         	else
//         	{
//         		var datetime  = new Date().getTime();
// 		        connection.query("select * from `event` where `TIME_START_E` < "  + datetime + " ORDER BY `TIME_START_E`" ,function(err,rows)
// 		        {
// 		            //connection.release();
// 		            if(!err) 
// 		            {
// 		                res.json(rows);
// 		            }           
// 		        });
//         	}
        	
//   		});
// 	// }
// 	// else 
// 	// {
// 	//     res.render('login.html');
// 	// }
// });

app.get('/AllEvent',function(req,res)
{
	sess = req.session;
	// console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
        	var datetime  = new Date().getTime();
	        connection.query("select * from `event` where `TIME_END_E` > "  + datetime + " ORDER BY `TIME_START_E`" ,function(err,rows)
	        {
	            //connection.release();
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

app.get('/AllEvent/:category',function(req,res)
{
	sess = req.session;
	// console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
        	var datetime  = new Date().getTime();
        	var category = req.params.category;
	        connection.query("select * from `event` where `TIME_END_E` > "  + datetime + " and `CATEGORY` = '" + category + " '" +" ORDER BY `TIME_START_E`" ,function(err,rows)
	        {
	            //connection.release();
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

app.get('/event/:id',function(req,res)
{
        pool.getConnection(function(err,connection)
        {
        // if (err) {
        //   res.json({"code" : 100, "status" : "Error in connection database"});
        //   return;
        // }   
     	var event_id = req.params.id;
        connection.query("select * from event where event_id =" + event_id,function(err,rows)
        {
            //connection.release();
            if(!err) 
            {
                res.json(rows);
            }           
        });

        // connection.on('error', function(err) {      
        //       res.json({"code" : 100, "status" : "Error in connection database"});
        //       return;     
        // });
  });
});

app.post('/check_event',function(req,res)
{
	sess = req.session;
    var form = req.body;
    pool.getConnection(function(err,connection)
	{
		connection.query("select * from `event` where `event_name` = '" + form.event_name + "'",function(err,rows)
	    {
	        //connection.release();
	        if(!err) 
	        {
	            if(rows.length > 0)
	            {
	            	res.end('error');
	            }
	            else
	            {
	            	res.end('done');
	            }
	        }           
	    });
    }); 
});

app.post('/create_event',function(req,res)
{
    sess = req.session;
    var form = req.body;
    console.log(form);
	//if(sess.member_id) 
	//{
	pool.getConnection(function(err,connection)
	{
		if(form.event_name == '')
	    {
	    	res.end('error : en');
	    	console.log('error : en')
	        return
	    }  		
	    connection.query("select * from `event` where `event_name` = '" + form.event_name + "'",function(err,rows)
	    {
	        //connection.release();
	        if(!err) 
	        {
	            if(rows.length > 0)
	            {
	            	res.end('error : sn');
	            	console.log('error : sn');
	            	return
	            }
	        }           
	    });
	    if(form.start_date == '' || form.start_time == '' || form.end_time == '' || form.end_date == '')
	    {
	    	res.end('error : t');
	    	console.log('error : t');
	        return
	    }
	    var datetime = form.start_date.toString() + "T" + form.start_time.toString() + ":00.000Z";
 		var start_time = new Date(datetime).getTime();
 		datetime = form.end_date.toString() + "T" + form.end_time.toString() + ":00.000Z";
 		var end_time = new Date(datetime).getTime();
 		var today = new Date().getTime();
	    if(today > start_time)
	    {
	        res.end('error : t>');
	        console.log('error : t>');
	        return;
	    }
	    else if(end_time <= start_time)
	    {
	        res.end('error : t<');
	        console.log('error : t<');
	        return;
	    }
	    if(form.min_age < 0 || form.max_age < 0  || form.min_age > 120 || form.max_age > 120 || form.ticket_price < 0 || form.max_seat < 0)
	    {
	    	res.end('error : xxxx');
	    	console.log('error : xxxx');
	        return;
	    }
	    console.log('<3');

	    connection.query("INSERT INTO `event` (`OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `LOCATION_lat`, `LOCATION_lng`) VALUES" + "('" + sess.member_id + "','" + form.event_name + "','" +  form.category + "','" + form.detail + "','" + form.pic + "','" + form.video + "','" + start_time + "','" + end_time +  "','" + form.min_age + "','" + form.max_age + "','" + form.gender + "','" + '0' +  "','" + form.max_seat + "','" + form.ticket_price + "','" + form.location_lat + "','" + form.location_lng + "')",function(err)
	    {
	        //connection.release();
	        console.log(err);
	        if(!err) 
	        {
	        	console.log('dsfagrr');
	            var temp = [form.event_name,'done'];
	            res.json('temp');
	        }
	        else
	        {
	        	console.log('insert error');
	        	res.end('error');
	        }           
	    });
    }); 
    // }
	// else 
	// {
	//     res.render('login.html');
	// }  
});

app.get('/DeleteEvent/:id_event/:pass',function(req,res)
{
	sess = req.session;
	//var form = req.body;
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
        	var datetime  = new Date().getTime();
	        connection.query("select * from `member` where `member_id` = '" + sess.member_id + "'",function(err,rows)
	        {
	        	console.log(rows);
	        	console.log(rows.length);
	            if( rows.length > 0) 
	            {
	            	console.log(rows[0].PASSWORD);
	        		console.log(req.params.pass);
	                if( rows[0].PASSWORD != req.params.pass)
	                {
	                	res.end('error');
	                }
	                else
	                {
	                	connection.query("DELETE FROM `event` WHERE `EVENT_ID` = " + req.params.id_event,function(err,rows)
				        {
				            if(rows.affectedRows != 0) 
				            {
				                res.end('done');
				            }   
				            else
				            {
				            	res.end('error');
				            }        
				        });
	                }
	            }   
	            else
	            {
	            	res.end('error');
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