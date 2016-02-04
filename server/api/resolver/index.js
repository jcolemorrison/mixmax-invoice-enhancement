'use strict';

var express = require('express');
var controller = require('./resolver.controller');
var cors = require('cors');

var router = express.Router();

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

router.get('/', controller.index);
router.post('/', cors(corsOptions), controller.create);

module.exports = router;
