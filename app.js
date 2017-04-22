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
		var id = sess.member_id;
	    res.json(id);
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
            	console.log('login fail');
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

app.get('/member/:id',function(req,res)
{
	sess = req.session;
	//console.log(sess.member_id);
	if(sess.member_id) 
	{
	    pool.getConnection(function(err,connection)
        {
	     	var mem_id = req.params.id;
	        connection.query("select * from `member` where `member_id` = '" + req.params.id + "'",function(err,rows)
	        {
	            connection.release();
	            if(!err) 
	            {
	            	rows[0].PASSWORD = "sshhhhh!";
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
	            	rows[0].PASSWORD = "sshhhhh!";
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
	detail = [];
	sess = req.session;
	// console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
        	var datetime  = new Date().getTime() - 25200000;
        	console.log("select * from `event` where `TIME_END_E` > "  + datetime + " ORDER BY `TIME_START_E`");
	        connection.query("select * from `event` where `TIME_END_E` > "  + datetime + " ORDER BY `TIME_START_E`" ,function(err,rows)
	        {
	            //connection.release();
	            if(!err) 
	            {
	            	detail[0] = rows;
	            	connection.query("SELECT * FROM `category` WHERE 1" ,function(err,rows)
	        		{
	        			if(!err) 
	            		{
	        				detail[1] = rows;
	        				res.json(detail);
	        			}
	        		});
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
	detail = [];
	sess = req.session;
	// console.log(sess);
	// if(sess.member_id) 
	// {
	    pool.getConnection(function(err,connection)
        {
        	var datetime  = new Date().getTime() - 25200000;
        	var category = req.params.category;
        	console.log("select * from `event` where `TIME_END_E` > "  + datetime + " and `CATEGORY` = '" + category + " '" +" ORDER BY `TIME_START_E`" );
	        connection.query("select * from `event` where `TIME_END_E` > "  + datetime + " and `CATEGORY` = '" + category + " '" +" ORDER BY `TIME_START_E`" ,function(err,rows)
	        {
	            //connection.release();
	            if(!err) 
	            {
	                detail[0] = rows;
	            	connection.query("SELECT * FROM `category` WHERE 1" ,function(err,rows)
	        		{
	        			if(!err) 
	            		{
	        				detail[1] = rows;
	        				res.json(detail);
	        			}
	        		});
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
	var event_id = req.params.id;
    pool.getConnection(function(err,connection)
    {
        connection.query("select * from event where event_id =" + event_id,function(err,rows)
        {
            if(rows.length > 0) 
            {
            	connection.query("SELECT * FROM `join_event` WHERE `EVENT_ID` = '" + event_id +"' and `MEMBER_ID` = " + sess.member_id,function(err,rows)
				{
				    if(rows.length <= 0) 
			        {
			        	var today = new Date();
			            console.log("INSERT INTO `join_event`(`EVENT_ID`, `MEMBER_ID`, `TIME`) VALUES ('"+ event_id +"','"+ sess.member_id + "','" + today.getTime() + "')");
			            connection.query("INSERT INTO `join_event`(`EVENT_ID`, `MEMBER_ID`, `TIME`) VALUES ('"+ event_id +"','"+ sess.member_id + "','" + today.getTime() + "')",function(err,rows)
					    {
					 		console.log(err);
					        if(!err) 
					        {
					           	console.log('join suscess!');
					            res.end('done');
					        }
					        else
					        {
						       	console.log('join fail!');
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
            } 
            else
            {
            	console.log('event fail');
		        res.end('error');
            }          
        });     	
  	});
});

app.get('/gift/:id_event/:id_member',function(req,res)
{
	sess = req.session;
	var event_id = req.params.id_event;
    var member_id = req.params.id_member;
    pool.getConnection(function(err,connection)
    {
        connection.query("select * from event where event_id =" + event_id,function(err,rows)
        {
            if(rows.length > 0) 
            {
                connection.query("select * from `member` where `member_id` = '" + member_id + "'",function(err,rows)
		        {
		            if(rows.length > 0) 
		            {
		            	connection.query("SELECT * FROM `join_event` WHERE `EVENT_ID` = '" + event_id +"' and `MEMBER_ID` = " + member_id,function(err,rows)
				        {
				            if(rows.length <= 0) 
				            {
				            	console.log("INSERT INTO `join_event`(`EVENT_ID`, `MEMBER_ID`, `TIME`) VALUES ('"+ event_id +"','"+ member_id + "','" + today.getTime() + "')");			            	
				            	connection.query("INSERT INTO `join_event`(`EVENT_ID`, `MEMBER_ID`, `TIME`) VALUES ('"+ event_id +"','"+ member_id + "','" + today.getTime() + "')",function(err,rows)
						        {
						        	console.log(err);
						            if(!err) 
						            {
						            	console.log('gift suscess!');
						                res.end('done');
						            }
						            else
						            {
						            	console.log('gift fail!');
						            	res.end('error');
						            }           
						        });
				            }
				            else
				            {
				            	console.log('gift fail');
				            	res.end('error');
				            }           
				        });
		            }
		            else
		            {
		            	console.log('member fail');
		            	res.end('error');
		            }           
		        });
            } 
            else
            {
            	console.log('event fail');
		        res.end('error');
            }          
        });     	
  	});
});

// app.get('/event/:id',function(req,res)
// {
//     pool.getConnection(function(err,connection)
//     {
//      	var event_id = req.params.id;
//         connection.query("select * from event where event_id =" + event_id,function(err,rows)
//         {
//             if(!err) 
//             {
//             	var date = rows[0].TIME_START_E;
//             	var _start_date = new Date(parseInt(date));
//             	var _start_time = _start_date.toISOString().split('T')[1].split('.000Z')[0];
//             	_start_date = _start_date.toISOString().split('T')[0];
//             	rows[0].start_date = _start_date;
//             	rows[0].start_time = _start_time;
//             	date = rows[0].TIME_END_E;
//             	var _end_date = new Date(parseInt(date));
//             	var _end_time = _end_date.toISOString().split('T')[1].split('.000Z')[0];
//             	_end_date = _end_date.toISOString().split('T')[0];
//             	rows[0].end_date = _end_date;
//             	rows[0].end_time = _end_time;
//                 res.json(rows);
//             }           
//         });
//   	});
// });

app.get('/event/:id',function(req,res)
{
	var detail = [];
    pool.getConnection(function(err,connection)
    {
     	var event_id = req.params.id;
        connection.query("select * from event where event_id =" + event_id,function(err,rows)
        {
        	console.log(err);
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
            	detail = rows.concat(detail);
                //res.json(detail);
                connection.query("select * from `member` where `member_id` = '" + detail[0].OWNER_ID + "'",function(err,rows)
        		{
        			console.log(err);
	            	if(!err) 
	            	{
	            		rows[0].PASSWORD = "shhhhh!";
	            		detail = detail.concat(rows);
	            		//res.json(detail);
	            		connection.query("SELECT * FROM `join_event` WHERE `EVENT_ID` =" + detail[0].EVENT_ID ,function(err,rows)
				        {
				        	console.log(err);
				        	other = '';
				            //if(!err) 
				            //{
				            	if(!err)
				            	{
					            	for (var item of rows) 
							    	{
							    		other = other + "MEMBER_ID = '" + item.MEMBER_ID + "'" + ' or ';
							    	}
							    	other = other.substr(0,other.length - 4);
						    	}						    	
						    	connection.query("SELECT * FROM `member` WHERE " + other + " ORDER BY rand() ",function(err,rows)
								{		 
									console.log(err);   	
								    //if(!err)
								    //{
								    	if(!err)
				            			{
									    	for (var i = rows.length - 1; i >= 0; i--) {
									    		rows[i].PASSWORD = "sshhh!";
									    	}
								    	}
								    	detail[2] = rows;
	            						//res.json(detail);
	            						var datetime  = new Date().getTime();
	            						connection.query("SELECT * FROM `event` WHERE `TIME_END_E` > "  + datetime + " ORDER BY rand() ",function(err,rows)
										{		
											console.log(err);    	
										    //if(!err)
										    //{										    	
										    	detail[3] = rows;
			            						res.json(detail);
										    // }
										    // else
										    // {
										    // 	res.end('error');
										    // }
										});
								    // }
								    // else
								    // {
								    // 	res.end('error');
								    // }
								});
				            //}   
				            // else
				            // {
				            // 	console.log('error');
				            // 	res.end('error');
				            // }        
				        });
	            	}
            	});
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

	    var start = form.start_time.substr(0,form.start_time.length - 4) + '420Z';
	    var end  = form.end_time.substr(0,form.end_time.length - 4) + '420Z';
	    var start_time = new Date(start);
	    var end_time = new Date(end);
	    var today = new Date();

	    // var _today = new Date();
	    // var today = _today.getTime();
	    // form.start_date = form.start_date.substr(0,form.start_date.length - 4) + '420Z';
	    // form.start_time = form.start_date.substr(0,form.start_date.length - 4) + '420Z';
	    // var _start_date = new Date(form.start_date)
	    // var _start_time = new Date(form.start_time);
	    // var start_time = _start_time.getTime() + _start_date.getTime();
	    

	    // var datetime = form.start_date.toString() + "T" + form.start_time.toString() + ".000Z";
	    // console.log(datetime);
 		// var start_time = new Date(datetime).getTime();
 		// datetime = form.end_date.toString() + "T" + form.end_time.toString() + ".000Z";
 		// var end_time = new Date(datetime).getTime();
 		// var today = new Date().getTime();

 		//console.log(datetime);
 		

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
	    console.log("INSERT INTO `event` (`OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `LOCATION_lat`, `LOCATION_lng` , `TIME` ) VALUES" + "('" + sess.member_id + "','" + form.event_name + "','" +  form.category + "','" + form.detail + "','" + form.pic + "','" + form.video + "','" + start_time.getTime() + "','" + end_time.getTime() +  "','" + form.min_age + "','" + form.max_age + "','" + form.gender + "','" + '0' +  "','" + form.max_seat + "','" + form.ticket_price + "','" + form.location_lat + "','" + form.location_lng + "','" + today.getTime() + "')");

	    connection.query("INSERT INTO `event` (`OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `LOCATION_lat`, `LOCATION_lng` , `TIME` ) VALUES" + "('" + sess.member_id + "','" + form.event_name + "','" +  form.category + "','" + form.detail + "','" + form.pic + "','" + form.video + "','" + start_time.getTime() + "','" + end_time.getTime() +  "','" + form.min_age + "','" + form.max_age + "','" + form.gender + "','" + '0' +  "','" + form.max_seat + "','" + form.ticket_price + "','" + form.location_lat + "','" + form.location_lng + "','" + today.getTime() + "')",function(err)
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
	    	res.end('error');
	    	console.log('error : en')
	    }  		
	    connection.query("SELECT * FROM `member` WHERE `USERNAME` = '" + form.user + "'",function(err,rows)
	    {
	        //connection.release();
	        if(!err) 
	        {
	            if(rows.length > 0)
	            {
	            	res.end('error');
	            	console.log('error : sn');
	            }
	            else
	            {
				  //   var datetime = form.bd.toString();
				  //   console.log(datetime);
			 		// var datetime = new Date(datetime).getTime();
			 		var today = new Date();
			    	var date = form.bd.split('T')[0] + "T17:00:00.420Z";
	    			//var date_timestamp = new Date(date);
	    			//var new_date = date_timestamp.getTime();
	    			var birthday = new Date(date)
	    			var bd = birthday.getFullYear() + '-' + (birthday.getMonth()+1) + '-' + birthday.getDate();

					console.log(today.toISOString().split('T')[0]);
					console.log(bd);

					if(today < birthday)
					{
						res.end('error');
						console.log('error : t');
					}
				    else
				    {
				        console.log("INSERT INTO `member`(`USERNAME`, `PASSWORD`, `FNAME`, `LNAME`, `SEX`, `BIRTH_DATE`, `E-MAIL`, `PHONE`, `CREDIT_CARD`, `URL_IMG`) VALUES ('" + form.user + "','" + form.pass + "','" + form.fname + "','" + form.lname + "','" + form.sex + "','" + bd + "','" + form.email + "','" + form.phone + "','" + form.cd + "','" + form.img + "')");

					    connection.query("INSERT INTO `member`(`USERNAME`, `PASSWORD`, `FNAME`, `LNAME`, `SEX`, `BIRTH_DATE`, `E-MAIL`, `PHONE`, `CREDIT_CARD`, `URL_IMG`) VALUES ('" + form.user + "','" + form.pass + "','" + form.fname + "','" + form.lname + "','" + form.sex + "','" + bd + "','" + form.email + "','" + form.phone + "','" + form.cd + "','" + form.img + "')",function(err)
					    {
					        //connection.release();
					        //console.log(datetime);
					        console.log(err);
					        if(!err) 
					        {
					        	console.log('insert suscess');
					            var temp = form.user;
					            res.json(temp);
					        }
					        else
					        {
					        	console.log('error');
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

app.post('/editprofile',function(req,res)
{
    sess = req.session;
    var form = req.body;
    
    console.log(form);
	//if(sess.member_id) 
	//{
	pool.getConnection(function(err,connection)
	{
		if(form.pass != form.repass)
		{
			res.end('error : password not match re-password');
		    console.log('error : password not match re-password')
		}
		else
		{
			if(form.user == '' || form.fname == '' || form.lname == '' || form.bd == '' || form.sex == '' || form.cd == '' || form.phone == '')
		    {
		    	res.end('error : space');
		    	console.log('error : space')
		    }  		
		    else
		    {
		    	var today = new Date();
		    	var date = form.bd.split('T')[0] + "T17:00:00.420Z";
    			//var date_timestamp = new Date(date);
    			//var new_date = date_timestamp.getTime();
    			var birthday = new Date(date)
    			var bd = birthday.getFullYear() + '-' + (birthday.getMonth()+1) + '-' + birthday.getDate();

				console.log(today.toISOString().split('T')[0]);
				console.log(bd);

				if(today < birthday)
				{
					res.end('error : t');
					console.log('error : t');
				}
				else
				{
					console.log("UPDATE `member` SET `USERNAME`= '" + form.user + "',`PASSWORD`= '" + form.pass + "',`FNAME`= '" + form.fname + "',`LNAME`='" + form.lname + "',`SEX`='" + form.sex + "',`BIRTH_DATE`='" + bd + "',`E-MAIL`='" + form.email + "',`PHONE`='" + form.phone + "',`CREDIT_CARD`='" + form.cd + "',`URL_IMG`='" + form.img + "' WHERE `MEMBER_ID` = " + sess.member_id);

					connection.query("UPDATE `member` SET `USERNAME`= '" + form.user + "',`PASSWORD`= '" + form.pass + "',`FNAME`= '" + form.fname + "',`LNAME`='" + form.lname + "',`SEX`='" + form.sex + "',`BIRTH_DATE`='" + bd + "',`E-MAIL`='" + form.email + "',`PHONE`='" + form.phone + "',`CREDIT_CARD`='" + form.cd + "',`URL_IMG`='" + form.img + "' WHERE `MEMBER_ID` = " + sess.member_id,function(err)
					{
						//connection.release();
						//console.log(datetime);
						console.log(err);
						if(!err) 
						{
						    console.log('edit suscess');
						    var temp = form.user;
						    res.json(temp);
						}
						else
						{
						    console.log('edit error');
						    res.end('error');
						}           
					});
				}
	    	}
		}
		
    }); 
    // }
	// else 
	// {
	//     res.render('login.html');
	// }  
});

app.get('/follow/:id',function(req,res)
{
	sess = req.session;
	console.log(sess);
	if(sess.member_id) 
	{
	    pool.getConnection(function(err,connection)
        {
        	connection.query("select * from `member` where `member_id` = '" + req.params.id + "'",function(err,rows)
	        {
	            if(rows.length > 0) 
	            {
	                connection.query("SELECT * FROM `following` WHERE `FOLLOWING_ID` = '" + req.params.id + "'",function(err,rows)
			        {
			            if(rows.length <= 0) 
			            {
			                console.log("INSERT INTO `following`(`MEMBER_ID`, `FOLLOWING_ID`) VALUES ( '" + sess.member_id + "','" + req.params.id + "')");
					        connection.query("INSERT INTO `following`(`MEMBER_ID`, `FOLLOWING_ID`) VALUES ( '" + sess.member_id + "','" + req.params.id + "')" ,function(err,rows)
					        {
					            //connection.release();
					            console.log(err);
					            if(!err) 
					            {
					                res.end(sess.member_id + 'follow' + req.params.id);
					            }      
					            else
					            {
					            	res.end('error');
					            }     
					        });
			            }
			            else
			            {
			            	res.end('error');
			            }           
			        });
	            }
	            else
	            {
	            	res.end('error');
	            }           
	        });     	
  		});
	}
	else 
	{
	    res.end('error');
	}
});

app.get('/unfollow/:id',function(req,res)
{
	sess = req.session;
	console.log(sess);
	if(sess.member_id) 
	{
	    pool.getConnection(function(err,connection)
        {
        	console.log("DELETE FROM `following` WHERE `MEMBER_ID` = '" + sess.member_id + "' and  `FOLLOWING_ID` = '" + req.params.id + "'" );
	        connection.query("DELETE FROM `following` WHERE `MEMBER_ID` = '" + sess.member_id + "' and  `FOLLOWING_ID` = '" + req.params.id + "'" ,function(err,rows)
	        {
	            //connection.release();
	            console.log(err);
	            if(!err) 
	            {
	                res.end(sess.member_id + 'unfollow' + req.params.id);
	            }      
	            else
	            {
	            	res.end('error');
	            }     
	        });
  		});
	}
	else 
	{
	    res.end('error');
	}
});

app.get('/following_list',function(req,res)
{
	sess = req.session;
	var follow = '';
	if(sess.member_id) 
	{
		pool.getConnection(function(err,connection)
        {
		    console.log("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id);
		    connection.query("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id,function(err,rows)
		    {		    	
		    	if(rows.length > 0)
		    	{
		    		for (var item of rows) 
		    		{
		    			follow = follow + "MEMBER_ID = '" + item.FOLLOWING_ID + "'" + ' or ';
		    		}
		    		follow = follow.substr(0,follow.length - 4);
		    		console.log("SELECT * FROM `member` WHERE " + follow);
		    		connection.query("SELECT * FROM `member` WHERE " + follow,function(err,rows_foll)
				    {		    	
				    	if(rows.length > 0)
				    	{
				    		res.json(rows_foll);
				    	}
				    	else
				    	{
				    		res.end('error');
				    	}
				    });
		    	}
		    	else
		    	{
		    		res.end('error');
		    	}
		    });
		});
	}
	else 
	{
	    res.end('error');
	}
});

app.get('/follower_list',function(req,res)
{
	sess = req.session;
	var follower = '';
	if(sess.member_id) 
	{
	    pool.getConnection(function(err,connection)
        {
		    console.log("SELECT * FROM `following` WHERE `FOLLOWING_ID` = " + sess.member_id);
		    connection.query("SELECT * FROM `following` WHERE `FOLLOWING_ID` = " + sess.member_id,function(err,rows)
		    {		    	
		    	if(rows.length > 0)
		    	{
		    		for (var item of rows) 
		    		{
		    			follower = follower + "MEMBER_ID = '" + item.FOLLOWING_ID + "'" + ' or ';
		    		}
		    		follower = follower.substr(0,follower.length - 4);
		    		console.log("SELECT * FROM `member` WHERE " + follower);
		    		connection.query("SELECT * FROM `member` WHERE " + follower,function(err,rows_foll)
				    {		    	
				    	if(rows.length > 0)
				    	{
				    		res.json(rows_foll);
				    	}
				    	else
				    	{
				    		res.end('error');
				    	}
				    });
		    	}
		    	else
		    	{
		    		res.end('error');
		    	}
		    });
		});
	}
	else 
	{
	    res.end('error');
	}
});

app.get('/other_join/:event_id',function(req,res)
{
	sess = req.session;
	var other = '';
    pool.getConnection(function(err,connection)
    {
        connection.query("SELECT * FROM `join_event` WHERE `EVENT_ID` =" + req.params.event_id ,function(err,rows)
        {
            if(rows.length > 0) 
            {
            	for (var item of rows) 
		    	{
		    		other = other + "MEMBER_ID = '" + item.MEMBER_ID + "'" + ' or ';
		    	}
		    	other = other.substr(0,other.length - 4);
		    	connection.query("SELECT * FROM `member` WHERE " + other,function(err,rows)
				{		    	
				    if(rows.length > 0)
				    {
				    	res.json(rows);
				    }
				    else
				    {
				    	res.end('error');
				    }
				});
            }   
            else
            {
            	console.log('error');
            	res.end('error');
            }        
        });
  	});
});

app.get('/joinevent',function(req,res)
{
	sess = req.session;
	var list = '';
    pool.getConnection(function(err,connection)
    {
        connection.query("SELECT * FROM `join_event` WHERE `MEMBER_ID` =" + sess.member_id ,function(err,rows)
        {
            if(rows.length > 0) 
            {
            	for (var item of rows) 
		    	{
		    		list = list + "EVENT_ID = '" + item.EVENT_ID + "'" + ' or ';
		    	}
		    	list = list.substr(0,list.length - 4);
		    	connection.query("SELECT * FROM `event` WHERE " + list,function(err,rows)
				{		    	
				    if(rows.length > 0)
				    {
				    	res.json(rows);
				    }
				    else
				    {
				    	res.end('error');
				    }
				});
            }   
            else
            {
            	console.log('error');
            	res.end('error');
            }        
        });
  	});
});

app.get('/following_create_event',function(req,res)
{
	sess = req.session;
	var list = '';
	if(sess.member_id) 
	{
		pool.getConnection(function(err,connection)
        {
		    console.log("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id);
		    connection.query("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id,function(err,rows)
		    {		    	
		    	if(rows.length > 0)
		    	{
		    		for(var item of rows)
		    		{
		    			list = list + "(OWNER_ID = '" + item.FOLLOWING_ID + "' and MEMBER_ID = '" + item.FOLLOWING_ID + "')" + ' or ';
		    		}
		    		list = list.substr(0,list.length - 4);
		    		console.log("SELECT *  FROM `event` JOIN  `member` WHERE " + list);
		    		connection.query("SELECT *  FROM `event` JOIN  `member` WHERE " + list ,function(err,rows)
					{	
						//console.log(rows);
						for (var i = rows.length - 1; i >= 0; i--) {
							rows[i].PASSWORD = "shhhhhh!"
						}
					    res.json(rows);
					});
		    	}
		    	else
		    	{
		    		res.end('error');
		    	}
		    });
		});
	}
	else 
	{
	    res.end('error');
	}
});

app.get('/following_join_event',function(req,res)
{
	sess = req.session;
	var list = '';
	if(sess.member_id) 
	{
		pool.getConnection(function(err,connection)
        {
		    console.log("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id);
			connection.query("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id,function(err,rows)
			{		    	
				// if(rows.length > 0)
				// {
					for(var item of rows)
					{
					  	list = list + "(join_event.MEMBER_ID='" + item.FOLLOWING_ID + "' and member.MEMBER_ID='" + item.FOLLOWING_ID + "') or ";
					}
					list = list.substr(0,list.length - 4);
					var today = new Date();
					console.log("SELECT join_event.EVENT_ID,join_event.MEMBER_ID,join_event.TIME,event.EVENT_NAME,event.CATEGORY,event.DETAIL,event.PICTURE,event.TIME_START_E,event.TIME_END_E,member.MEMBER_ID,member.USERNAME,member.URL_IMG  FROM event JOIN join_event ON event.EVENT_ID=join_event.EVENT_ID JOIN member ON " + list + " WHERE event.TIME_END_E > " + today.getTime() );
					connection.query("SELECT join_event.EVENT_ID,join_event.MEMBER_ID,join_event.TIME,event.EVENT_NAME,event.CATEGORY,event.DETAIL,event.PICTURE,event.TIME_START_E,event.TIME_END_E,member.MEMBER_ID,member.USERNAME,member.URL_IMG  FROM event JOIN join_event ON event.EVENT_ID=join_event.EVENT_ID JOIN member ON " + list + " WHERE event.TIME_END_E > " + today.getTime(),function(err,rows)
					{	
						rows = rows.sort(function(a,b) {return (b.TIME > a.TIME) ? 1 : ((a.TIME > b.TIME) ? -1 : 0);} );
						res.json(rows);
					});
					//res.json(detail);
				// }
				// else
				// {
				// 	res.end('error');
				// }
			});
		});
	}
	else 
	{
	    res.end('error');
	}
});

app.get('/profile/:id',function(req,res)
{
	var detail = [];
	sess = req.session;
	//sess = req.session;
	// if(sess.member_id) 
	// {
		pool.getConnection(function(err,connection)
        {
        	console.log("select * from `member` where `MEMBER_ID` = '" + req.params.id + "'");
	        connection.query("select * from `member` where `MEMBER_ID` = '" + req.params.id + "'",function(err,rows)
	        {
	            connection.release();
	            if(!err) 
	            {
	            	rows[0].PASSWORD = "sshhhhhhh!";
	            	detail[0] = rows;
	                //res.json(detail);
	                console.log("SELECT * FROM `following` WHERE `MEMBER_ID` = " + req.params.id);
				    connection.query("SELECT * FROM `following` WHERE `MEMBER_ID` = " + req.params.id,function(err,rows)
				    {		    	
				    	// if(rows.length > 0)
				    	// {
				    		follow = '';
				    		for (var item of rows) 
				    		{
				    			follow = follow + "MEMBER_ID = '" + item.FOLLOWING_ID + "'" + ' or ';
				    		}
				    		follow = follow.substr(0,follow.length - 4);
				    		if(follow.length < 1)
				    		{
				    			follow = 0;
				    		}
				    		console.log("SELECT * FROM `member` WHERE " + follow);
				    		connection.query("SELECT * FROM `member` WHERE " + follow,function(err,rows)
						    {		    	
						    	// if(rows.length > 0)
						    	// {
						    		for (var i = rows.length - 1; i >= 0; i--) {
						    			rows[i].PASSWORD = "sshhhhhhh!";
						    		}
						    		detail[1] = rows;
						    		//res.json(detail);
						    		console.log("SELECT * FROM `following` WHERE `FOLLOWING_ID` = " + req.params.id);
								    connection.query("SELECT * FROM `following` WHERE `FOLLOWING_ID` = " + req.params.id,function(err,rows)
								    {		    	
								    	// if(rows.length > 0)
								    	// {
								    		follow = '';
								    		for (var item of rows) 
								    		{
								    			follow = follow + "MEMBER_ID = '" + item.MEMBER_ID + "'" + ' or ';
								    		}
								    		follow = follow.substr(0,follow.length - 4);
								    		if(follow.length < 1)
								    		{
								    			follow = 0;
								    		}
								    		console.log("SELECT * FROM `member` WHERE " + follow);
								    		connection.query("SELECT * FROM `member` WHERE " + follow,function(err,rows)
										    {		    	
										    	// if(rows.length > 0)
										    	// {
										    		for (var i = rows.length - 1; i >= 0; i--) {
										    			rows[i].PASSWORD = "sshhhhhhh!";
										    		}
										    		detail[2] = rows;
										    		//res.json(detail);
										    		connection.query("SELECT * FROM `join_event` WHERE `MEMBER_ID` =" + req.params.id ,function(err,rows)
											        {
											            // if(rows.length > 0) 
											            // {
											            	list = '';
											            	for (var item of rows) 
													    	{
													    		list = list + "EVENT_ID = '" + item.EVENT_ID + "'" + ' or ';
													    	}
													    	list = list.substr(0,list.length - 4);
													    	if(list.length < 1)
												    		{
												    			list = 0;
												    		}
													    	var datetime  = new Date().getTime() - 25200000;
													    	// console.log("SELECT * FROM `event` WHERE " + list + " and `TIME_END_E` > "  + datetime + " ORDER BY `TIME` DESC");
	        												//connection.query("SELECT * FROM `event` WHERE " + list + " and `TIME_END_E` > "  + datetime + " ORDER BY `TIME` DESC",function(err,rows)
	        												console.log("SELECT * FROM `event` WHERE " + list + " ORDER BY `TIME` DESC");
	        												connection.query("SELECT * FROM `event` WHERE " + list + " ORDER BY `TIME` DESC",function(err,rows)
															{		    	
															    // if(rows.length > 0)
															    // {
															    	detail[3] = rows;
															    	for (var i = detail[3].length - 1; i >= 0; i--) {
															    		detail[3][i].TYPE = 'JOINED';
															    	}
															    	//res.json(detail);
															    	var datetime  = new Date().getTime();
															    	// console.log("SELECT * FROM `event` WHERE `OWNER_ID` =" + req.params.id + " and `TIME_END_E` > "  + datetime + " ORDER BY `TIME` DESC")
															    	// connection.query("SELECT * FROM `event` WHERE `OWNER_ID` =" + req.params.id + " and `TIME_END_E` > "  + datetime + " ORDER BY `TIME` DESC",function(err,rows)
															    	console.log("SELECT * FROM `event` WHERE `OWNER_ID` =" + req.params.id + " ORDER BY `TIME` DESC")
															    	connection.query("SELECT * FROM `event` WHERE `OWNER_ID` =" + req.params.id + " ORDER BY `TIME` DESC",function(err,rows)
															        {
															            // if(rows.length > 0) 
															            // {
															            	for (var i = rows.length - 1; i >= 0; i--) {
																	    		rows[i].TYPE = 'CREATED';
																	    	}
															            	detail[3] = detail[3].concat(rows);
															            	detail[3] = detail[3].sort(function(a,b) {return (b.TIME > a.TIME) ? 1 : ((a.TIME > b.TIME) ? -1 : 0);} );	
																			//detail[4] = rows;
																			// res.json(detail);
																			connection.query("SELECT * FROM `following` WHERE `MEMBER_ID` = '" + sess.member_id + "' and `FOLLOWING_ID` = '" + req.params.id + "'",function(err,rows)
															        		{
															        			if( rows.length > 0)
															        			{
															        				detail[4] = true;
															        				res.json(detail);
															        			}
															        			else
															        			{
															        				detail[4] = false;
															        				res.json(detail);
															        			}
															        		});
															            // }   
															            // else
															            // {
															            // 	console.log('error');
															            // 	res.end('error');
															            // }        
															        });
															    // }
															    // else
															    // {
															    // 	res.end('error');
															    // }
															});
											            // }   
											            // else
											            // {
											            // 	console.log('error');
											            // 	res.end('error');
											            // }        
											        });
										    	// }
										    	// else
										    	// {
										    	// 	res.end('error');
										    	// }
										    });
								    	// }
								    	// else
								    	// {
								    	// 	res.end('error');
								    	// }
								    });
						    	// }
						    	// else
						    	// {
						    	// 	res.end('error');
						    	// }
						    });
				    	// }
				    	// else
				    	// {
				    	// 	res.end('error');
				    	// }
				    });
	            }
	            else
	            {
	            	res.end("fail id");
	            }           
	        });
  		});
	// }
	// else
	// {
	// 	res.end('error');
	// }
});

app.get('/newsfeed',function(req,res)
{
	var detail = [];
	sess = req.session;
	var list = '';
	var list_2 = '';
	if(sess.member_id) 
	{
		pool.getConnection(function(err,connection)
        {
	        connection.query("select * from `member` where `member_id` = '" + sess.member_id + "'",function(err,rows)
	        {
	            connection.release();
	            if(!err) 
	            {
	            	rows[0].PASSWORD = "sshhhhhhh!";
	            	detail[0] = rows;
	                //res.json(detail);
	                console.log("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id);
				    connection.query("SELECT * FROM `following` WHERE `MEMBER_ID` = " + sess.member_id,function(err,rows)
				    {		    	
				    	// if(rows.length > 0)
				    	// {
				    		var today = new Date().getTime() - 25200000;
				    		for(var item of rows)
				    		{
				    			list = list + "(OWNER_ID = '" + item.FOLLOWING_ID + "' and MEMBER_ID = '" + item.FOLLOWING_ID + "')" + ' or ';
				    			// list = list + "(OWNER_ID = '" + item.FOLLOWING_ID + "' and MEMBER_ID = '" + item.FOLLOWING_ID + "' and event.TIME_END_E > " + today + ")" + ' or ';
				    			list_2 = list_2 + "(join_event.MEMBER_ID='" + item.FOLLOWING_ID + "' and member.MEMBER_ID='" + item.FOLLOWING_ID + "') or ";
				    		}
				    		list = list.substr(0,list.length - 4);
				    		list_2 = list_2.substr(0,list_2.length - 4);
				    		console.log("SELECT *  FROM `event` JOIN  `member` WHERE " + list );
				    		connection.query("SELECT *  FROM `event` JOIN  `member` WHERE " + list ,function(err,rows)
							{	
								//console.log(rows);
								for (var i = rows.length - 1; i >= 0; i--) {
									rows[i].PASSWORD = "shhhhhh!"
									rows[i].TYPE = "CREATED";
								}
								detail[1] = rows;
								//res.json(detail);
								// console.log("SELECT join_event.EVENT_ID,join_event.MEMBER_ID,join_event.TIME,event.EVENT_NAME,event.CATEGORY,event.DETAIL,event.PICTURE,event.TIME_START_E,event.TIME_END_E,member.MEMBER_ID,member.USERNAME,member.URL_IMG  FROM event JOIN join_event ON event.EVENT_ID=join_event.EVENT_ID JOIN member ON " + list_2 + " WHERE event.TIME_END_E > " + today );
								// connection.query("SELECT join_event.EVENT_ID,join_event.MEMBER_ID,join_event.TIME,event.EVENT_NAME,event.CATEGORY,event.DETAIL,event.PICTURE,event.TIME_START_E,event.TIME_END_E,member.MEMBER_ID,member.USERNAME,member.URL_IMG  FROM event JOIN join_event ON event.EVENT_ID=join_event.EVENT_ID JOIN member ON " + list_2 + " WHERE event.TIME_END_E > " + today,function(err,rows)
								console.log("SELECT join_event.EVENT_ID,join_event.MEMBER_ID,join_event.TIME,event.EVENT_NAME,event.CATEGORY,event.DETAIL,event.PICTURE,event.TIME_START_E,event.TIME_END_E,member.MEMBER_ID,member.USERNAME,member.URL_IMG  FROM event JOIN join_event ON event.EVENT_ID=join_event.EVENT_ID JOIN member ON " + list_2 );
								connection.query("SELECT join_event.EVENT_ID,join_event.MEMBER_ID,join_event.TIME,event.EVENT_NAME,event.CATEGORY,event.DETAIL,event.PICTURE,event.TIME_START_E,event.TIME_END_E,member.MEMBER_ID,member.USERNAME,member.URL_IMG  FROM event JOIN join_event ON event.EVENT_ID=join_event.EVENT_ID JOIN member ON " + list_2,function(err,rows)
								{	
									for (var i = rows.length - 1; i >= 0; i--) {
										rows[i].TYPE = "JOINED";
									}
									detail[1] = detail[1].concat(rows);
									detail[1] = detail[1].sort(function(a,b) {return (b.TIME > a.TIME) ? 1 : ((a.TIME > b.TIME) ? -1 : 0);} );
									res.json(detail);
								});
							    //res.json(detail);
							});
				    	// }
				    	// else
				    	// {
				    	// 	res.end('error');
				    	// }
				    });
	            }
	            else
	            {
	            	res.end("fail id");
	            }           
	        });
  		});
	}
	else
	{
		res.end('error');
	}
});

app.listen(5555);