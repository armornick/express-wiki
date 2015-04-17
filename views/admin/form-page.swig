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
			<label for="category">category:</small></label>
			<input name="category" type="text" value="{{ formData.category }}" class="form-control">
		</div>

		<textarea name="body" class="form-control" rows="15">{{ formData.body }}</textarea>

		<input type="submit" class="btn btn-default">
	</form>
{% endblock %}