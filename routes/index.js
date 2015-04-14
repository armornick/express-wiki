var express = require('express');
var site = require('../site');

var router = express();

/* GET home page. */
router.get('/', function(req, res, next) {
	var themedir = site.config('theme') || 'theme';
	console.log(themedir);
  	res.render(themedir + '/index', { title: 'Express', sitename: site.config('sitename') });
});

module.exports = router;