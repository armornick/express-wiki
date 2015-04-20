{% extends 'layout.swig' %}

{% block content %}

	{% for slug, page in pages %}
	<article class="row">
		<div class="col-md-6">
			<a href="/page/{{ slug }}"><strong>{{ slug }}</strong>: {{ page.title }}</a>
		</div>
		<div class="col-md-6">
			<a href="{{ path }}/page/edit/{{ slug }}" class="btn btn-default">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
			</a>
			<a href="{{ path }}/page/delete/{{ slug }}" class="btn btn-default">
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete
			</a>
		</div>
	</article>
	{% endfor %}

	<a href="{{ path }}/page/add" class="btn btn-default">
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New Page
	</a>

{% endblock %}