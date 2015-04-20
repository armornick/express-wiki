Simple Express Wiki
===================

A simple wiki-esque content management system written in Express.


## Configuration and adding content

All site administration is done via `/admin`. There is a main configuration page (by default located at `/admin/config`) to set the site name, author name and site theme.

There is a page manager to view, edit and remove existing pages or add new pages. Page content is in the markdown format (including compatibility with the Github-flavored markdown variant) using the Marked markdown compiler.


## Theming

Themes are subdirectories of the views directory and are made with the SWIG template language. Only a template with the name `page.swig` is required. Optionally, it is possible to specify an `index.swig` template for the home page.

In the template, links pointing to `/theme` are redirected to the assets directory of the theme. This makes it possible to distribute themes as simple zip files (or folders).

Themes for the admin area are not possible at the moment.


## Content

The content of the CMS is written as markdown files with a front matter (compatible with most static site generators). 

The site configuration is written as a json file and contains site info and basic info about every page. It is possible to view the info in the json file by navigating to `/admin/config/dump`.