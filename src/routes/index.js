var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node js boilerplate ( with database configuration and auth )' });
});


module.exports = router;
