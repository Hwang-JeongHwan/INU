const express = require('express');
const router = express.Router();
const request = require('request');
const Barcode = require('../models/barcode');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'barcode' });
});

module.exports = router;
