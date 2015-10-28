var express = require('express');
var router = express.Router();

var key = '8bb1d844-5642-42e5-8e13-1a15596633a5';

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
