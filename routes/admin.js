var express = require('express');
var site = require('../site');
var router = express();

/* GET administration main page */
router.get('/', function (req, res) {
	res.render('admin/index', { title: 'Administration', cfg: site.config(), path: router.mountpath });
});

/* GET main configuration form */
router.get('/config/?', function(req, res) {
  res.render('admin/config', { title: 'Administration', cfg: site.config() });
});

/* POST set main configuration */
router.post('/config/?', function (req, res) {
	console.log('sitename: ' + req.body.sitename);
	console.log('author: ' + req.body.author);

	site.config('sitename', req.body.sitename);
	site.config('author', req.body.author);

	res.render('admin/config', { title: 'Administration', cfg: site.config() });
});

/* GET add page form */
router.get('/page/add', function (req, res) {
	res.render('admin/form-page', { title: 'Add Page', formData: {} });
});

module.exports = router;