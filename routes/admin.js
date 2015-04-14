var express = require('express');
var site = require('../site');
var router = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Administration', cfg: site.config() });
});

/* POST set main configuration */
router.post('/', function (req, res) {
	console.log('sitename: ' + req.body.sitename);
	console.log('author: ' + req.body.author);

	site.config('sitename', req.body.sitename);
	site.config('author', req.body.author);

	res.render('admin/index', { title: 'Administration', cfg: site.config() });
});

module.exports = router;