var express = require('express');
var router = express.Router();

/* GET users listing. (/exercises/promises) */
router.get('/promises', function(req, res, next) {
    res.render('promises', { // just 'promises' not 'exercises/promises' because promises.hbs is in views directly
        title: 'Promises Exercise'
    });
})

module.exports = router;

// then hook it up in the app.js file