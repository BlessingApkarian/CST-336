var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/lab7', function(req, res, next) {
  res.render('/labs/lab7/app.js');
});

module.exports = router;
