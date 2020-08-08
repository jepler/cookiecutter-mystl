---
layout: base
title: {{ cookiecutter.project_name }}
---

{% raw %}


{% for asset in site.data.assets %}
  {% assign stlbasename = asset.stl | split: "/" | last | split: "." | first %}
### {{ asset.name }}

<html>
{% for image in asset.images %}
{% assign basename = image | split: "/" | last | split: "." | first %}
{% if basename == stlbasename %}
<img src="{{ relative }}resources/{{ image }}" title="{{ asset.name }}" data-stl="{{ relative }}resources/{{ asset.stl }}">
{% else %}
<img src="{{ relative }}resources/{{ image }}" title="{{ asset.name }}">
{% endif %}
{% endfor %}
</html>

{% endfor %}

{% comment %}
Sections to consider adding:
## How I made this
## Print Settings
## Remixed from
{% endcomment %}

## Downloads

{% for asset in site.data.assets %}
### {{ asset.name }}:

{{ asset.notes }}

{% if asset.flags %} 
STL generated with `{{ asset.flags }}`
{% endif %}

{% if asset.scad %}
{% assign basename = asset.scad | split: "/" | last %}
  - [{{ basename }}](resources/{{ asset.scad }})
{% endif %}
{% if asset.stl %} 
  {% assign basename = asset.stl | split: "/" | last %}
  - [{{ basename }}](resources/{{ asset.stl }})
  {% endif %}
{% if asset.svg %} 
  {% assign basename = asset.svg | split: "/" | last %}
  - [{{ basename }}](resources/{{ asset.svg }})
  {% endif %}
{% for download in asset.downloads %}
  {% assign basename = download | split: "/" | last %}
  - [{{ basename }}](resources/{{ download }})
{% endfor %}
{% endfor %}


{% endraw %}
