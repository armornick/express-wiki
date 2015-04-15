{% extends 'layout.swig' %}

{% block content %}
  <p class="text-center">Welcome to {{ sitename }}!</p>

  {{ contents | raw }}
{% endblock %}