const express = require('express');
const router = express.Router();
const title = require('../constants/constants').TITLE;

router.get('/', function (req, res, next) {
  res.render('index', {title});
});

module.exports = router;
