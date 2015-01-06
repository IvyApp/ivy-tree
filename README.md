# ivy-tree

[![Build Status](https://travis-ci.org/IvyApp/ivy-tree.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tree)

A group of [Ember.js Components] that interact to create a [WAI-ARIA tree]
interface.

## Installation

### As as Ember CLI addon

Use this addon in your ember-cli application:

```sh
npm install --save-dev IvyApp/ivy-tree
```

## Usage

The following example is adapted from the [OpenAjax Alliance Accessibility
Treeview Example][tree example]:

```handlebars
{{#ivy-tree}}
  {{#ivy-tree-item}}
    <span>Fruits</span>
    {{#ivy-tree-group}}
      {{#ivy-tree-item}}Oranges{{/ivy-tree-item}}
      {{#ivy-tree-item}}Pineapples{{/ivy-tree-item}}
      {{#ivy-tree-item}}
        <span>Apples</span>
        {{#ivy-tree-item-toggle tagName="span"}}(toggle){{/ivy-tree-item-toggle}}
        {{#ivy-tree-group}}
          {{#ivy-tree-item}}Macintosh{{/ivy-tree-item}}
          {{#ivy-tree-item}}
            <span>Granny Smith</span>
            {{#ivy-tree-group}}
              {{#ivy-tree-item}}Washington State{{/ivy-tree-item}}
              {{#ivy-tree-item}}Michigan{{/ivy-tree-item}}
              {{#ivy-tree-item}}New York{{/ivy-tree-item}}
            {{/ivy-tree-group}}
          {{/ivy-tree-item}}
          {{#ivy-tree-item}}Fuji{{/ivy-tree-item}}
        {{/ivy-tree-group}}
      {{/ivy-tree-item}}
      {{#ivy-tree-item}}Bananas{{/ivy-tree-item}}
      {{#ivy-tree-item}}Pears{{/ivy-tree-item}}
    {{/ivy-tree-group}}
  {{/ivy-tree-item}}
  {{#ivy-tree-item}}
    <span>Vegetables</span>
    {{#ivy-tree-group}}
      {{#ivy-tree-item}}Broccoli{{/ivy-tree-item}}
      {{#ivy-tree-item}}Carrots{{/ivy-tree-item}}
    {{/ivy-tree-group}}
  {{/ivy-tree-item}}
{{/ivy-tree}}
```

Some things to note:

* `ivy-tree-item-toggle` must be an immediate child of `ivy-tree-item`.
* `ivy-tree-group` must be an immediate child of `ivy-tree-item`.

## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your
change is tested or it won't be merged.

### Installation

```sh
git clone git@github.com:IvyApp/ivy-tree.git
cd ivy-tree
npm install
```

### Running

```sh
ember server
```

Then visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

```sh
ember test
```

Or, to start a test server:

```sh
ember test --server
```

### Building

```sh
ember build
```

For more information on using ember-cli, visit
[http://www.ember-cli.com/](http://www.ember-cli.com/).

[Ember.js Components]: http://emberjs.com/guides/components/
[WAI-ARIA tree]: http://www.w3.org/TR/wai-aria/roles#tree
[tree example]: http://oaa-accessibility.org/examplep/treeview1/
