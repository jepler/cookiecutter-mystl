# {{ cookiecutter.repo_name }}

{{ cookiecutter.project_short_description }}

This is a project created with [cookiecutter-mystl](https://github.com/jepler/cookiecutter-mystl).
Use cookiecutter-mystl to host your own OpenSCAD and STL models!
Have improvements to your site?  Contribute them back to cookiecutter-mystl!

## Requirements

See .github/workflows/publish.yml for the canonical requirements.
Intended to work on debian systems with a minimum of fuss.

 * admesh
 * git
 * Imagemagick
 * jekyll
 * make
 * OpenSCAD
 * python3
 * python3-yaml

For headless building,
 * xauth
 * xvfb

## Models and STL generation from .scad files

`_data/assets.yml` describes the files that make up your project.
It should be a series of blocks.
At a minimum the block must have a name and an stl file.
It can optionally have notes, an scad file, scad generation flags, images, and other downloads.
You can refer to a source scad file multiple times with different flags,
in order to generate related or parametric models.

## Build assets and render Locally

    $ make
    $ jekyll serve --watch

## Build locally and push site to github pages

    $ make publish

## Push to {{ cookiecutter.main_branch_name }} branch and get a gh-pages build:

    $ git push origin {{ cookiecutter.main_branch_name }}
