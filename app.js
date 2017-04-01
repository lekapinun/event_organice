var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var pool = mysql.createPool
({
    connectionLimit : 1000, //important
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

app.get('/check',function(req,res)
{
	sess = req.session;
	if(sess.email) 
	{
	    res.end('done');
	}
	else 
	{
	    res.end('error');
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
	    //$window.location.href = '#!/index';
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

app.get('/join/:id',function(req,res)
{
	sess = req.session;
    pool.getConnection(function(err,connection)
    {

    	var event_id = req.params.id;
        connection.query("select * from event where event_id =" + event_id,function(err,rows)
        {
            if(rows.length > 0) 
            {
                var event_id = req.params.id;
		        connection.query("INSERT INTO `join_event`(`EVENT_ID`, `MEMBER_ID`) VALUES ("+ event_id +","+ sess.member_id+")",function(err,rows)
		        {
		            if(!err) 
		            {
		            	console.log('join suscess!');
		                res.end('done');
		            }
		            else
		            {
		            	console.log('join fail');
		            	res.end('error');
		            }           
		        });
            } 
            else
            {
            	console.log('join fail');
		        res.end('error');
            }          
        });     	
  	});
});

app.get('/event/:id',function(req,res)
{
    pool.getConnection(function(err,connection)
    {
     	var event_id = req.params.id;
        connection.query("select * from event where event_id =" + event_id,function(err,rows)
        {
            if(!err) 
            {
            	var date = rows[0].TIME_START_E;
            	var _start_date = new Date(parseInt(date));
            	var _start_time = _start_date.toISOString().split('T')[1].split('.000Z')[0];
            	_start_date = _start_date.toISOString().split('T')[0];
            	rows[0].start_date = _start_date;
            	rows[0].start_time = _start_time;
            	date = rows[0].TIME_END_E;
            	var _end_date = new Date(parseInt(date));
            	var _end_time = _end_date.toISOString().split('T')[1].split('.000Z')[0];
            	_end_date = _end_date.toISOString().split('T')[0];
            	rows[0].end_date = _end_date;
            	rows[0].end_time = _end_time;
                res.json(rows);
            }           
        });
  	});
});

app.get('/my_event',function(req,res)
{
	sess = req.session;
	console.log('my_event');
    pool.getConnection(function(err,connection)
    {
        connection.query("SELECT * FROM `event` WHERE `OWNER_ID` =" + sess.member_id ,function(err,rows)
        {
            if(!err) 
            {
            	console.log('all event of you!');
                res.json(rows);
            }   
            else
            {
            	console.log('error');
            	res.end('error');
            }        
        });
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
	    var datetime = form.start_date.toString() + "T" + form.start_time.toString() + ".000Z";
	    console.log(datetime);
 		var start_time = new Date(datetime).getTime();//1492714800000;//new Date(datetime).getTime();
 		datetime = form.end_date.toString() + "T" + form.end_time.toString() + ".000Z";
 		var end_time = new Date(datetime).getTime();//1492725600000;//new Date(datetime).getTime();
 		var today = new Date().getTime();

 		console.log(datetime);
 		

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
	    console.log("INSERT INTO `event` (`OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `LOCATION_lat`, `LOCATION_lng`) VALUES" + "('" + sess.member_id + "','" + form.event_name + "','" +  form.category + "','" + form.detail + "','" + form.pic + "','" + form.video + "','" + start_time + "','" + end_time +  "','" + form.min_age + "','" + form.max_age + "','" + form.gender + "','" + '0' +  "','" + form.max_seat + "','" + form.ticket_price + "','" + form.location_lat + "','" + form.location_lng + "')");

	    connection.query("INSERT INTO `event` (`OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `LOCATION_lat`, `LOCATION_lng`) VALUES" + "('" + sess.member_id + "','" + form.event_name + "','" +  form.category + "','" + form.detail + "','" + form.pic + "','" + form.video + "','" + start_time + "','" + end_time +  "','" + form.min_age + "','" + form.max_age + "','" + form.gender + "','" + '0' +  "','" + form.max_seat + "','" + form.ticket_price + "','" + form.location_lat + "','" + form.location_lng + "')",function(err)
	    {
	        //connection.release();
	        console.log(start_time);
	        console.log(end_time);
	        console.log(err);
	        if(!err) 
	        {
	        	console.log('dsfagrr');
	            var temp = form.event_name;
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


app.post('/edit_event/:id',function(req,res)
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
	    if(form.start_date == '' || form.start_time == '' || form.end_time == '' || form.end_date == '')
	    {
	    	res.end('error : t');
	    	console.log('error : t');
	    }
	    else
	    {
	    	var datetime = form.start_date.toString() + "T" + form.start_time.toString() + ".000Z";
		    console.log(datetime);
	 		var start_time = new Date(datetime).getTime();//1492714800000;//new Date(datetime).getTime();
	 		datetime = form.end_date.toString() + "T" + form.end_time.toString() + ".000Z";
	 		var end_time = new Date(datetime).getTime();//1492725600000;//new Date(datetime).getTime();
	 		var today = new Date().getTime();

	 		console.log(datetime);
	 		

		    if(today > start_time)
		    {
		        res.end('error : t>');
		        console.log('error : t>');
		    }
		    else if(end_time <= start_time)
		    {
		        res.end('error : t<');
		        console.log('error : t<');
		    }
		    if(form.min_age < 0 || form.max_age < 0  || form.min_age > 120 || form.max_age > 120 || form.ticket_price < 0 || form.max_seat < 0)
		    {
		    	res.end('error : xxxx');
		    	console.log('error : xxxx');
		    }
		    else
		    {
			    connection.query("UPDATE `event` SET `EVENT_NAME`= '" + form.event_name + "',`CATEGORY`= '" + form.category + "' ,`DETAIL`= '" + form.detail + "',`PICTURE`= '" + form.pic + "',`VIDEO`= '" + form.video + "',`TIME_START_E`= '" + start_time + "',`TIME_END_E`= '" + end_time + "',`CONDITION_MIN_AGE`= '" + form.min_age + "',`CONDITION_MAX_AGE`='" + form.max_age + "',`CONDITION_SEX`= '" + form.gender + "',`MAX_SEAT`= '" + form.max_seat + "',`PRICE`= '" + form.ticket_price + "',`LOCATION_lat`= '" + form.location_lat + "',`LOCATION_lng`= '" + form.location_lng + "' WHERE `EVENT_ID` =" + req.params.id,function(err)
			    {
			        //connection.release();
			        console.log(start_time);
			        console.log(end_time);
			        console.log(err);
			        if(!err) 
			        {
			        	console.log('update suscess');
			            var temp = form.event_name;
			            res.json('temp');
			        }
			        else
			        {
			        	console.log('update error');
			        	res.end('error');
			        }           
			    });
		    } 
	    }
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

app.get('/supoort_list',function(req,res)
{
	sess = req.session;
	// console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
	        connection.query("SELECT * FROM `support`" ,function(err,rows)
	        {
	            //connection.release();
	            if(!err) 
	            {
	                res.json(rows);
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

app.get('/category',function(req,res)
{
	sess = req.session;
	// console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
	        connection.query("SELECT * FROM `Category`" ,function(err,rows)
	        {
	            //connection.release();
	            if(!err) 
	            {
	                res.json(rows);
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

app.post('/signup',function(req,res)
{
    sess = req.session;
    var form = req.body;
    console.log(form);
	//if(sess.member_id) 
	//{
	pool.getConnection(function(err,connection)
	{
		if(form.user == '' || form.fname == '' || form.lname == '' || form.bd == '' || form.sex == '')
	    {
	    	res.end('error : en');
	    	console.log('error : en')
	        return
	    }  		
	    connection.query("SELECT * FROM `member` WHERE `USERNAME` = '" + form.user + "'",function(err,rows)
	    {
	        //connection.release();
	        if(!err) 
	        {
	            if(rows.length > 0)
	            {
	            	res.end('error : sn');
	            	console.log('error : sn');
	            }
	            else
	            {
				  //   var datetime = form.bd.toString();
				  //   console.log(datetime);
			 		// var datetime = new Date(datetime).getTime();
			 		var today = new Date();

			 		console.log(today.toISOString().split('T')[0]);
			 		console.log(form.bd.split('T')[0]);

				    if(today < form.bd)
				    {
				        res.end('error : t');
				        console.log('error : t');
				    }
				    else
				    {
				        console.log("INSERT INTO `member`(`NATIONAL_ID`, `USERNAME`, `PASSWORD`, `FNAME`, `LNAME`, `SEX`, `BIRTH_DATE`, `ADDRESS`, `E-MAIL`, `PHONE`, `CREDIT_CARD`, `URL_IMG`) VALUES ('" + form.nid + "','" + form.user + "','" + form.pass + "','" + form.fname + "','" + form.lname + "','" + form.sex + "','" + form.bd.split('T')[0] + "','" + form.address + "','" + form.email + "','" + form.phone + "','" + form.cd + "','" + form.img + "')");

					    connection.query("INSERT INTO `member`(`NATIONAL_ID`, `USERNAME`, `PASSWORD`, `FNAME`, `LNAME`, `SEX`, `BIRTH_DATE`, `ADDRESS`, `E-MAIL`, `PHONE`, `CREDIT_CARD`, `URL_IMG`) VALUES ('" + form.nid + "','" + form.user + "','" + form.pass + "','" + form.fname + "','" + form.lname + "','" + form.sex + "','" + form.bd.split('T')[0] + "','" + form.address + "','" + form.email + "','" + form.phone + "','" + form.cd + "','" + form.img + "')",function(err)
					    {
					        //connection.release();
					        //console.log(datetime);
					        console.log(err);
					        if(!err) 
					        {
					        	console.log('dsfagrr');
					            var temp = form.user;
					            res.json(temp);
					        }
					        else
					        {
					        	console.log('insert error');
					        	res.end('error');
					        }           
					    });
				    }
	            }
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