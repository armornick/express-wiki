{% extends 'layout.swig' %}

{% block content %}

	{% for slug, title in pages %}
	<article class="row">
		<div class="col-md-6">
			<a href="/page/{{ slug }}"><strong>{{ slug }}</strong>: {{ title }}</a>
		</div>
		<div class="col-md-6">
			<a href="{{ path }}/page/edit/{{ slug }}" class="btn btn-default">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
			</a>
		</div>
	</article>
	{% endfor %}

	<a href="{{ path }}/page/add" class="btn btn-default">
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New Page
	</a>

{% endblock %}