var express = require('express');
var site = require('../site');

var router = express();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = site.getPage('index');
  	res.render(data.theme + '/index', data);
});

/* GET home page. */
router.get('/page/:slug', function(req, res, next) {
	var data = site.getPage(req.params.slug);
  	res.render(data.theme + '/page', data);
});

module.exports = router;