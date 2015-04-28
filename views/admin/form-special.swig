{% extends 'layout.swig' %}

{% block content %}
	{% if error %}
	<div class="alert alert-danger" role="alert">{{ error }}</div>
	{% endif %}

	<form method="post">
		<div class="form-group">
			<label for="title">title: </label>
			<input name="title" type="text" value="{{ formData.title }}" class="form-control">
		</div>

		<div class="form-group">
			<label for="slug">slug: <small>(the page name which is added to the url)</small></label>
			<input name="slug" type="text" value="{{ formData.slug }}" class="form-control">
		</div>

		<div class="form-group">
			<label for="pagetype">page type:</label>
			<select id="pagetype" name="pagetype" class="form-control">
				<option value="category">List pages based on their category</option>
				<option value="redirect">Redirect to another url</option>
			</select>
		</div>

		<div class="form-group pagetype-item pagetype-category">
			<label for="category">category to list: </label>
			<!-- <input name="category" type="text" class="form-control"> -->
			<select id="category" name="category" class="form-control">
				{% for cat in categories %}
				<option value="{{cat}}">{{cat}}</option>
				{% endfor %}
			</select>
		</div>

		<div class="form-group pagetype-item pagetype-redirect">
			<label for="url">URL to redirect to: </label>
			<input name="url" type="text" class="form-control">
		</div>

		<input type="submit" class="btn btn-default">
	</form>
{% endblock %}

{% block scripts %}
<script src="{{ path }}/theme/special.js"></script>
{% endblock %}