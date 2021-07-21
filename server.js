// Dependencies
// =============================================================
var express = require("express");
var path = require("path"); 

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//Data objects
var Tables = [];

var WaitList = [];


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.get("/api/tables", function(req, res) {
    res.json(Tables);
  });

  app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    //console.log(newTable);
    var longitud = Tables.length; 
    //console.log(`La longitud del arreglo de mesas es: ${longitud}`);
    if(longitud < 5){
      Tables.push(newTable);
      console.log("True: Your reservation has been completed");
    }
    else{
      WaitList.push(newTable);
      console.log("False: Your reservation is on waitlist");
    }
    res.json(newTable);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(WaitList);
  });

  app.post("/api/clear",function(req,res){
    Tables = [];
    WaitList = []; 
    console.log("Empty tables");
  })
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  