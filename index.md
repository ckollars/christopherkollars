---
layout: page
---

I’m currently writing code at [Fuzzco](http://fuzzco.com). I sometimes go on adventures around Oregon's great outdoors.

{% for post in site.posts %}
  {% include post-list.html %}
{% endfor %}
