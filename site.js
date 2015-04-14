var md = require('marked'),
	fm = require('front-matter'),
	yaml = require('yaml-js'),
	cat = require('shelljs').cat,
	test = require('shelljs').test;

// Constants -----------------------------------------------------------
var SITE_DIR = 'site/';
var PAGE_DIR = SITE_DIR+'content/';

// Load existing site configuration ------------------------------------
var config = {};

if (test('-f', 'site/config.json')) {
	config = JSON.parse(cat(SITE_DIR+'config.json'));
};

// Utility functions ===================================================

// save site configuration to file -------------------------------------
function saveConfiguration () {
	JSON.stringify(config).to(SITE_DIR+'config.json');
}

// get base template data ----------------------------------------------
function getBaseData () {
	return {
		sitename: config.sitename,
		author: config.author,
		theme: config.theme || 'theme',
	};
}

// does a page with this slug exist? ----------------------------------
function pageExists (slug) {
	return test('-f', PAGE_DIR+slug+'.md');
}

// load page by slug --------------------------------------------------
function loadPage (slug) {
	var pagedata = fm(cat(PAGE_DIR+slug+'.md'));
	return pagedata;
}

// save page data to file ---------------------------------------------
function savePage (data) {
	var filename = PAGE_DIR+data.slug+'.md';

	"---\n".to(filename);
	yaml.dump(data.attributes).toEnd(filename);
	"\n---\n".toEnd(filename);
	data.body.toEnd(filename);
}

// Main site API =======================================================

var site = module.exports = {}

// get/save site configuration -----------------------------------------
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

site.getPage = function (slug) {
	var data = getBaseData();

	if (pageExists(slug)) {
		var pagedata = loadPage(slug);
		data.contents = pagedata.body;

		for (var attribute in pagedata.attributes) {
			data[attribute] = pagedata.attributes[attribute];
		}
	};

	data.title = data.title || slug;
	data.contents = md(data.contents || "Page does not exist yet");

	return data;
}