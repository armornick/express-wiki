var md = require('marked'),
	fm = require('front-matter'),
	yaml = require('yaml-js'),
	path = require('path'),
	sanitize = require('sanitize-filename'),
	cat = require('shelljs').cat,
	test = require('shelljs').test,
	ls = require('shelljs').ls;

// Constants -----------------------------------------------------------
var SITE_DIR = 'site/';
var PAGE_DIR = SITE_DIR+'content/';
var THEME_DIR = 'views/';

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

// load all pages in the content directory ----------------------------
function listPages () {
	return ls(PAGE_DIR+'*.md');
}

// normalize slug -----------------------------------------------------
function normalizeSlug (slug) {
	slug = slug.replace(' ', '-');
	return sanitize(slug.toLowerCase());
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

// load page data from file -------------------------------------------
site.getPage = function (slug) {
	var data = getBaseData();
	slug = normalizeSlug(slug);

	// calculate template data
	if (slug === 'index' && test('-f', THEME_DIR+data.theme+'/index.swig')) {
		data.template = data.theme+'/index';
	} else {
		data.template = data.theme+'/page';
	};

	// load page contents and attributes
	if (pageExists(slug)) {
		var pagedata = loadPage(slug);
		data.contents = pagedata.body;

		for (var attribute in pagedata.attributes) {
			data[attribute] = pagedata.attributes[attribute];
		}
	};

	data.title = data.title || slug;
	data.contents = md(data.contents || "Page does not exist yet. Do you wish to [create it](/admin/page/add/"+slug+")?");

	return data;
}

// save page data to file ---------------------------------------------
site.savePage = function (data) {
	var slug = data.attributes.slug = normalizeSlug(data.attributes.slug);
	var filename = PAGE_DIR+slug+'.md';

	"---\n".to(filename);
	yaml.dump(data.attributes).toEnd(filename);
	"\n---\n".toEnd(filename);
	data.body.toEnd(filename);

	config.pages[slug] = data.attributes.title || 'Untitled';
	saveConfiguration();
}

// (re)build index of pages ------------------------------------------------
site.rebuild = function () {
	config.pages = {};

	var pages = listPages();
	pages.forEach(function (file) {
		var slug = path.basename(file, '.md');
		var pagedata = loadPage(slug);

		config.pages[slug] = pagedata.attributes.title || 'Untitled';
	});

	saveConfiguration();
}

// get list of themes (subdirectories of views dir) ------------------------
site.getThemes = function () {
	var themes = [];

	ls(THEME_DIR).forEach(function (file) {
		if (test('-d', THEME_DIR+file) && file !== 'admin') {
			themes.push(path.basename(file));
		};
	});

	return themes;
}