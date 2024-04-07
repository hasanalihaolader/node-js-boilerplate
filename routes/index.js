var express = require('express');
const sequelize = require('../config/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'STS ( Support ticket management system )' });
});


sequelize.checkDatabaseConnection();
module.exports = router;
