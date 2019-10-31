var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('/jake', {
      title: "Jake",
      message: "Jake is the pizza god"
  });
});

// router.post('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
