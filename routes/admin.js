var express = require('express');
var site = require('../site');
var router = express();

/* GET administration main page */
router.get('/', function (req, res) {
	res.render('admin/index', { title: 'Administration', cfg: site.config(), path: router.mountpath });
});

/* GET main configuration form */
router.get('/config/?', function(req, res) {
  res.render('admin/config', { title: 'Administration', path: router.mountpath, cfg: site.config() });
});

/* POST set main configuration */
router.post('/config/?', function (req, res) {
	site.config('sitename', req.body.sitename);
	site.config('author', req.body.author);

	// res.render('admin/config', { title: 'Administration', cfg: site.config() });
	res.redirect(router.mountpath);
});

/* GET rebuild configuration data */
router.get('/config/rebuild', function (req, res) {
	site.rebuild();
	res.redirect(router.mountpath+'/config/dump');
});

/* GET dump configuration */
router.get('/config/dump', function (req, res) {
	res.json(site.config());
});

/* GET page manager */
router.get('/pages', function (req, res) {
	var pages = site.config('pages');
	res.render('admin/pages', { title: 'Page Manager', path: router.mountpath, pages: pages });
});

/* GET add page form */
router.get('/page/add', function (req, res) {
	res.render('admin/form-page', { title: 'Add Page', path: router.mountpath, formData: {} });
});

/* GET add page form (with slug argument) */
router.get('/page/add/:slug', function (req, res) {
	var slug = req.params.slug;
	res.render('admin/form-page', { title: 'Add Page', path: router.mountpath, formData: { slug: slug } });
});

/* POST save page to content */
router.post('/page/add/?*', function (req, res) {
	if (!req.body.slug) {
		res.render('admin/form-page', { title: 'Add Page', path: router.mountpath, formData: req.body, error: 'page slug is not allowed to be empty.' });
		return;
	};

	var data = {}; data.body = req.body.body, data.attributes = {};
	for (var attribute in req.body) {
		if (attribute !== 'body') {
			data.attributes[attribute] = req.body[attribute];
		};
	}

	site.savePage(data);

	res.redirect(router.mountpath);
});

module.exports = router;