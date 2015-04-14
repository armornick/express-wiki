{% extends 'layout.swig' %}

{% block content %}
	<form method="post">
		<div class="form-group">
			<label for="sitename">Site Name: </label>
			<input name="sitename" type="text" value="{{ cfg.sitename }}" class="form-control">
		</div>

		<div class="form-group">
			<label for="author">Site Author: </label>
			<input name="author" type="text" value="{{ cfg.author }}" class="form-control">
		</div>

		<input type="submit" class="btn btn-default">
	</form>
{% endblock %}