
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  
    var connection = mysql.createConnection({
      host     : 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
      user     : 'ds0xc2vmvbxi1e5j	',
      password : 'jke8m8nmv7y3hnq7',
      database : 'skzjmcjkossn3dap'
    });
     
    connection.connect();
     
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
      
      res.render('../public/examples/mySQL/view', {
          title: "My SQL Example",
          answer: results[0].solution
        });
    });
    
    connection.end();
});

module.exports = router;
