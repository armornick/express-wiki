var md = require('marked'),
	fm = require('front-matter'),
	cat = require('shelljs').cat,
	test = require('shelljs').test;

var config = {};

if (test('-f', 'site/config.json')) {
	config = JSON.parse(cat('site/config.json'));
};

var site = module.exports = {}

function saveConfiguration () {
	JSON.stringify(config).to('site/config.json');
}

site.config = function (key, val) {
	if (val === undefined || val === null) {
		if (!key) {
			return config;
		};

		return config[key];
	} else {
		if (!key) {
			throw new Error('Key not given.')
		};

		config[key] = val;
		saveConfiguration();
	}
}