
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

/* dashboard. */
router.get('/dashboard', function(req, res, next) {
  if(req.session && req.session.username && req.session.password.length){
    res.render('../public/examples/auth/dashboard', {
      title: "Dachboard",
      username: req.session.username
    });
  } else {
    delete req.session.username;
    res.redirect('auth/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('../public/examples/auth/login', {
    title: "Login"
  });
});

/* POST login credentials to login via JSON (/auth/login)*/
router.post('/login', function(req, res, next) {
  
  //TODO:   do something to login
  
  let successful = false;
  let message = "";
  
  if(req.body.username === "hello" && req.body.password === "world"){
    successful = true;
    req.session.username = req.body.username;
  }else{
    message = "Incorrect Username or Password";
  }
  
  console.log("req.body", req.body);
  
  res.json({
    result: successful,
    original: req.body
  });
});


module.exports = router;
