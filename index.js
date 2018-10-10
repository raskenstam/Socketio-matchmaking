var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "myusername",
  password: "mypassword",
  database: "mydb"
});

*/
var currentlobbies = [[]];

var newobject = {
  name: "name",id:"id "

}
var i=0;
var ii=0;
var port = process.env.PORT || 3000;
//todo startfunction if a server is ready reserve a place and check if user is ready. if user is ready add them to servertable.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('a', function(msg){
    io.emit('welcome', msg);
    addusertoarray(newobject);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
function addusertoarray(object){
  a = i+10;
  while ( i < a) { 
    currentlobbies[i[ii]] = object;
    console.log(currentlobbies[i[ii]]);
    i++;
    
}
  
}
/*function getfromdatabase(sql) {
con.connect(function(err) {
  if (err) throw err;
  //Select all customers and return the result object:
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

}
function inserttodatabase(sql) {




  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //Insert a record in the "customers" table:
     
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}*/