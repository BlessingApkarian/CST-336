const express = require("express");
const app = express();

// you can optionally use handlebars
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, js

// enable use of json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.get("/", function(req, res){

    res.render("index");

} );

app.post("/", function(req, res){

    res.json({
        answers: [
            {
                question: 1,
                correct: true,
            },  
            {
                question: 2,
                correct: true,
            },
            {
                question: 3,
                correct: true,
            },
            {
                question: 4,
                correct: true,
            },
            {
                question: 5,
                correct: true,
            }  
            
        ],
        original: req.body
    });

} );

// running server
app.listen(process.env.PORT || 8080, process.env.IP, function(){
    console.log("Express server is running...");
});

