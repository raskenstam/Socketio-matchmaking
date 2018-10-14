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
var currentlobbies = new Array(10)
for (i = 0; i < 9; i++) {
  currentlobbies[i] = new Array(10)
}
//data that will be put in lobbyarray


var port = process.env.PORT || 3000;
//todo startfunction if a server is ready reserve a place and check if user is ready. if user is ready add them to servertable.
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  socket.on('a', function (msg) {

    io.emit('welcome', msg);
    var newobject = {
      name: "asdasdas", mmr: msg.mm

    }
    matchmaking(newobject, 5, socket);
  });
});
http.listen(port, function () {

});
//first param is the object with socketid,mmr and name
function matchmaking(object, maxmmr, socket) {
  var i = 0;
  var a = 0;
  while (i < 9) {
    a = 0;
    var avaragmmr = calculatemmr(i);
    if (isNaN(avaragmmr) == true) {
      avaragmmr = object.mmr;
    }
    
    //todo add proper ifstatment



   
    var mmrlow =  parseInt(avaragmmr) + 5;
    
    var mmrhigh = parseInt(avaragmmr) - 5;
    console.log("mmrhigh"+mmrhigh+"mmrlow "+mmrlow)
    if (mmrhigh < object.mmr && mmrlow > object.mmr) {
      while (a <= 9) {

        if (currentlobbies[i][a] == undefined) {

          console.log("joined lobby"+i)
          currentlobbies[i][a] = object;
          //joins the lobbysocketioroom
          socket.join("room-" + i);
          if (joinedplayers(i) == 10) {
            //startroundcode here
            io.sockets.in("room-" + i).emit('startmatch', "10/10 join 666.666.666");
          }
          else {
            io.sockets.in("room-" + i).emit('b', joinedplayers(i));
          }





          return;
        }
       
        a++
      }
    }
    else {
      console.log("nolobbyfou")
    }



    i++;

  }
  

}

//calculates the mmr for the lobby, mmr is number between 1-5 and avarage mmr is all in lobby avarage mmr
function calculatemmr(lobby) {
  var totalmmr = 0;
  var playersinlobby = 0;

  a = 0;
  while (a < 8) {

    if (currentlobbies[lobby][a] == undefined) {



    }
    else {
      playersinlobby++;

      totalmmr = parseInt(totalmmr) + parseInt(currentlobbies[lobby][a].mmr);

    }
    a++
  }

  totalmmr = parseInt(totalmmr) / parseInt(playersinlobby);

  return totalmmr;


}
function joinedplayers(lobby) {

  var playersinlobby = 0;
  a = 0;
  while (a <= 9) {

    if (currentlobbies[lobby][a] == undefined) {



    }
    else {
      playersinlobby++;



    }
    a++
  }

  return playersinlobby;


}
//will emit the ip and uri thngy to the players in the lobby when its ready
function sendtoserver(lobby) {

}
function abortlobbie() {

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