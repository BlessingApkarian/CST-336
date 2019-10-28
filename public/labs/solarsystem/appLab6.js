//javascript file
const express = require("express"); // imports the express lib
const app = express(); // instantiate the top level function 

// render html file
app.engine('html', require('hbs').__express);

// we do lines 9 & 10 to include partials 
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

// static files must be included on a serperate folder
// This folder name must be specified in this file
app.use(express.static("publicSolar"));

//routes
app.get("/", function(req, res){ // creating the root route
    // res.send("it works!"); // send allows for short messages
    res.render("index.html"); // render 
});

//server listener
    // first param is port num, 
    // second param is IP address which refers to the local computer
    // third param is a callback that displays a message
// app.listen("8081","127.0.0.1", function(){
//     console.log("express Server is Running. . . ");
// });

// listener updated to use heroku env variables:
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("express Server is Running. . . ");
});

app.get("/mercury",function(req, res){
    // res.send("This will be Mercury web Page!");
    res.render("mercury.html")
});

app.get("/venus",function(req, res){
    // res.send("This will be Venus web Page!");
    res.render("venus.html")
});

app.get("/earth",function(req, res){
    res.render("earth.html")
});

app.get("/mars",function(req, res){
    res.render("mars.html")
});

app.get("/jupiter",function(req, res){
    res.render("jupiter.html")
});

