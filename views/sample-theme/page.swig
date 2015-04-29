{% extends 'layout.swig' %}

{% block content %}
	<div class="eight columns">
		{{ contents | raw }}
	</div>
	<div class="four columns">
	{% if category %}
		<h3>Related Pages</h3>
		<nav>
		{% for _slug, page in getPagesForCategory(category) %}
		{% if slug != _slug %}
			<li><a href="/page/{{ _slug }}">{{ page.title }}</a></li>
		{% endif %}
		{% endfor %}
		</nav>
	{% endif %}
	</div>
{% endblock %}