Simple Express Wiki
===================

A simple wiki-esque content management system written in Express.

Currently does not have user management, which means every visitor can access the site administration. This might change in the future.


## Configuration and adding content

All site administration is done via `/admin`. There is a main configuration page (by default located at `/admin/config`) to set the site name, author name and site theme.

There is a page manager to view, edit and remove existing pages or add new pages. Page content is in the markdown format (including compatibility with the Github-flavored markdown variant) using the [Marked markdown compiler](https://github.com/chjj/marked).

It is also possible to add pages with additional capabilities (called 'special pages'). The following types of special pages are available (along with the template files which are automatically used if available):

* Pages which list all posts of a certain category. Special pages in the category are not included. Optionally uses `category.swig` template.
* A page which redirects to another url.


## Theming

Themes are subdirectories of the views directory and are made with the SWIG template language. Only a template with the name `page.swig` is required. Optionally, it is possible to specify an `index.swig` template for the home page or a `special.swig` template for special pages. Special pages can

In the template, links pointing to `/theme` are redirected to the assets directory of the theme. This makes it possible to distribute themes as simple zip files (or folders).

Themes for the admin area are not possible at the moment.


## Content

The content of the CMS is written as markdown files with a front matter (compatible with most static site generators). It is possible to manually add/modify content in the `site/content` directory, and navigate to `/admin/config/rebuild` to build the site configuration to include the changes.

The site configuration is written as a json file and contains site info and basic info about every page. It is possible to view the info in the json file by navigating to `/admin/config/dump`.