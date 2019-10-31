//javascript file
const express = require("express"); // imports the express lib
const app = express(); // instantiate the top level function 

// render html file
app.engine('html', require('ejs').renderFile);

// static files must be included on a serperate folder
// This folder name must be specified in this file
app.use(express.static("public"));

//routes
app.get("/", function(req, res){ // creating the root route
    // res.send("it works!"); // send allows for short messages
    res.render("index.html"); // render 
});

//server listener
    // first param is port num, 
    // second param is IP address which refers to the local computer
    // third param is a callback that displays a message
// listener updated to use heroku env variables:
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("express Server is Running. . . ");
});

app.get("/index.html", function(req, res){ // creating the root route
    // res.send("it works!"); // send allows for short messages
    res.render("index.html"); // render 
});

app.get("/callback.html",function(req, res){
    // res.send("This will be Mercury web Page!");
    res.render("callback.html")
});

app.get("/concepts.html",function(req, res){
    // res.send("This will be Venus web Page!");
    res.render("concepts.html")
});

app.get("/instances.html",function(req, res){
    res.render("instances.html")
});
