{% extends 'layout.swig' %}

{% block content %}
	<div class="row">
		<div class="col-md-6">
			<h2>Administrative Tasks</h2>
			<div class="list-group">
				<a href="{{ path }}/config" class="list-group-item">
					<h4 class="list-group-item-heading">Site Configuration</h4>
					<p class="list-group-item-text">
						Change the main site configuration, like site name, author name, etc.
					</p>
				</a>
				<a href="{{ path }}/page/add" class="list-group-item">
					<h4 class="list-group-item-heading">Add New Page</h4>
					<p class="list-group-item-text">
						Add a page which can then be accessed by going to <code>/page/page-name</code>.
					</p>
				</a>
			</div>
		</div>
		<div class="col-md-6">
			<p><a href="/">Visit site</a></p>
			<h2>Current Settings</h2>
			<p>Site name: {{ cfg.sitename }}</p>
			<p>Author name: {{ cfg.author }}</p>
		</div>
	</div>
{% endblock %}