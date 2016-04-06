# ivy-tree

[![Build Status](https://travis-ci.org/IvyApp/ivy-tree.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tree)

A group of [Ember.js Components] that interact to create a [WAI-ARIA tree]
interface.

## Installation

```sh
$ ember install ivy-tree
```

## Usage

The following example is adapted from the [OpenAjax Alliance Accessibility
Treeview Example][tree example]:

```handlebars
{{#ivy-tree as |tree|}}
  {{#tree.item as |fruits|}}
    <span>Fruits</span>
    {{#fruits.group as |fruitsGroup|}}
      {{#fruitsGroup.item}}Oranges{{/fruitsGroup.item}}
      {{#fruitsGroup.item}}Pineapples{{/fruitsGroup.item}}
      {{#fruitsGroup.item as |apples|}}
        <span>Apples</span>
        {{#apples.group as |applesGroup|}}
          {{#applesGroup.item}}Macintosh{{/applesGroup.item}}
          {{#applesGroup.item as |granny|}}
            <span>Granny Smith</span>
            {{#granny.group as |grannyGroup|}}
              {{#grannyGroup.item}}Washington State{{/grannyGroup.item}}
              {{#grannyGroup.item}}Michigan{{/grannyGroup.item}}
              {{#grannyGroup.item}}New York{{/grannyGroup.item}}
            {{/granny.group}}
          {{/applesGroup.item}}
          {{#applesGroup.item}}Fuji{{/applesGroup.item}}
        {{/apples.group}}
      {{/fruitsGroup.item}}
      {{#fruitsGroup.item}}Bananas{{/fruitsGroup.item}}
      {{#fruitsGroup.item}}Pears{{/fruitsGroup.item}}
    {{/fruits.group}}
  {{/tree.item}}
  {{#tree.item as |veggies|}}
    <span>Vegetables</span>
    {{#veggies.group as |veggiesGroup|}}
      {{#veggiesGroup.item}}Broccoli{{/veggiesGroup.item}}
      {{#veggiesGroup.item}}Carrots{{/veggiesGroup.item}}
    {{/veggies.group}}
  {{/tree.item}}
{{/ivy-tree}}
```

Some things to note:

* `ivy-tree-group` must be an immediate child of `ivy-tree-item`.

## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your
change is tested or it won't be merged.

### Installation

```sh
git clone git@github.com:IvyApp/ivy-tree.git
cd ivy-tree
npm install
bower install
```

### Running

```sh
ember server
```

Then visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

```sh
ember test    # or
npm test      # (Runs `ember try:testall` to test your addon against multiple Ember versions)
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
[http://ember-cli.com/](http://ember-cli.com/).

[Ember.js Components]: http://emberjs.com/guides/components/
[WAI-ARIA tree]: http://www.w3.org/TR/wai-aria/roles#tree
[tree example]: http://oaa-accessibility.org/examplep/treeview1/
