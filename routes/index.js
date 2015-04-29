var express = require('express');
var site = require('../site');

var router = express();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = site.getPage('index');
  	res.render(data.template, data);
});

/* GET home page. */
router.get('/page/:slug', function(req, res, next) {
	var data = site.getPage(req.params.slug);

	if (data.pagetype == 'redirect') {
		res.redirect(data.url);
	};

  	res.render(data.template, data);
});

/* GET theme assets */
/* example: /theme/style.css is redirected to theme-dir/assets/style.css */
router.get('/theme/*', function (req, res, next) {
	var theme = site.config('theme') || 'theme';
	var file = req.params[0];

	res.sendFile(process.cwd() + '/views/'+theme+'/assets/'+file);
});

module.exports = router;