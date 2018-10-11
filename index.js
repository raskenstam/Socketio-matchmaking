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

//creates a 2d array with 10 lobbies for 10 players
var currentlobbies=new Array(10)
for (i=0; i <9; i++){
currentlobbies[i]=new Array(10)
}
//data that will be put in lobbyarray


var port = process.env.PORT || 3000;
//todo startfunction if a server is ready reserve a place and check if user is ready. if user is ready add them to servertable.
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  socket.on('a', function (msg) {
    console.log("message: "+msg.mm+msg.na)
    io.emit('welcome', msg);
    var newobject = {
      name: "asdasdas", mmr: 13
    
    }
    matchmaking(newobject,5,socket);
  });
});
http.listen(port, function () {
  console.log('listening on *:' + port);
});
//first param is the object with socketid,mmr and name
function matchmaking(object,maxmmr,socket) {
  var i = 0;
  var a = 0;
  while (i < 9) {
    a = 0;
    //caluclate members and mmr here
    while (a <= 9) {
      
      if(currentlobbies[i][a]==undefined){
        console.log(calculatemmr(i));
        console.log(joinedplayers(i));
        console.log(undefined+""+a+""+i);
        currentlobbies[i][a]=object;
        //joins the lobbynamespace
        socket.join(i);
        return;
      }
      else{
        
        console.log("defined"+currentlobbies[i][a].name+""+a+""+i);
      }
      a++
    }
    i++;

  }

}
//calculates the mmr for the lobby, mmr is number between 1-5 and avarage mmr is all in lobby avarage mmr
function calculatemmr(lobby){
  var totalmmr=0;
  var playersinlobby=0;
  a = 0;
    while (a < 9) {
      
      if(currentlobbies[lobby][a]==undefined){
        
        
        
      }
      else{
        playersinlobby++;
        console.log("defined"+currentlobbies[lobby][a]+""+a+""+lobby);
        totalmmr= totalmmr + currentlobbies[lobby][a].mmr;
        console.log("mmr"+totalmmr);
      }
      a++
    }
    return totalmmr/playersinlobby;
  

}
function joinedplayers(lobby){
  
  var playersinlobby=0;
  a = 0;
    while (a < 9) {
      
      if(currentlobbies[lobby][a]==undefined){
        
        
        
      }
      else{
        playersinlobby++;
        
        
       
      }
      a++
    }
    console.log("players in lobby "+lobby+" "+playersinlobby)
    return playersinlobby;
  

}
//will emit the ip and uri thngy to the players in the lobby when its ready
function sendtoserver(lobby){

}
function abortlobbie(){
  
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