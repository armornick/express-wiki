{% extends 'layout.swig' %}

{% block content %}
	
	{{ intro | raw }}

	<p>Pages in category <strong>{{ category }}</strong>:</p>

	<ul>
	{% for page in pages %}
		<li><a href="/page/{{ page.slug }}">{{ page.title }}</a></li>
	{% endfor %}
	</ul>
{% endblock %}