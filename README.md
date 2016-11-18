# ivy-tree

[![Build Status](https://travis-ci.org/IvyApp/ivy-tree.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tree)

A group of [Ember](http://emberjs.com) Components that interact to create a [WAI-ARIA tree](http://www.w3.org/TR/wai-aria/roles#tree) interface.

**Note that this addon makes use of [Contextual Components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components), which means that it won't work with Ember versions prior to 2.3.**

## Installation

```sh
$ ember install ivy-tree
```

## Usage

The following example is adapted from the [OpenAjax Alliance Accessibility Treeview Example](http://cookiecrook.com/test/aria/tree/ariatree2.html):

```handlebars
{{#ivy-tree as |tree|}}
  {{#tree.treeitem as |fruits|}}
    <span>Fruits</span>
    {{#fruits.group as |fruitsGroup|}}
      {{#fruitsGroup.treeitem}}Oranges{{/fruitsGroup.treeitem}}
      {{#fruitsGroup.treeitem}}Pineapples{{/fruitsGroup.treeitem}}
      {{#fruitsGroup.treeitem as |apples|}}
        <span>Apples</span>
        {{#apples.group as |applesGroup|}}
          {{#applesGroup.treeitem}}Macintosh{{/applesGroup.treeitem}}
          {{#applesGroup.treeitem as |granny|}}
            <span>Granny Smith</span>
            {{#granny.group as |grannyGroup|}}
              {{#grannyGroup.treeitem}}Washington State{{/grannyGroup.treeitem}}
              {{#grannyGroup.treeitem}}Michigan{{/grannyGroup.treeitem}}
              {{#grannyGroup.treeitem}}New York{{/grannyGroup.treeitem}}
            {{/granny.group}}
          {{/applesGroup.treeitem}}
          {{#applesGroup.treeitem}}Fuji{{/applesGroup.treeitem}}
        {{/apples.group}}
      {{/fruitsGroup.treeitem}}
      {{#fruitsGroup.treeitem}}Bananas{{/fruitsGroup.treeitem}}
      {{#fruitsGroup.treeitem}}Pears{{/fruitsGroup.treeitem}}
    {{/fruits.group}}
  {{/tree.treeitem}}
  {{#tree.treeitem as |veggies|}}
    <span>Vegetables</span>
    {{#veggies.group as |veggiesGroup|}}
      {{#veggiesGroup.treeitem}}Broccoli{{/veggiesGroup.treeitem}}
      {{#veggiesGroup.treeitem}}Carrots{{/veggiesGroup.treeitem}}
    {{/veggies.group}}
  {{/tree.treeitem}}
{{/ivy-tree}}
```

### Keyboard Shortcuts

The following keyboard shortcuts are supported:

  * `Up`: Select the previous visible tree item.
  * `Down`: Select the next visible tree item.
  * `Left`: Collapse the selected node, if it has children and is expanded. Otherwise, select its parent node.
  * `Right`: Expand the selected node, if it has children and is collapsed. Select its first child node.
  * `Home`: Select the first visible tree item.
  * `End`: Select the last visible tree item.
  * `Enter`: Toggle the expanded or collapsed state of the selected node.
  * `*`: Expand all parent nodes in the tree.

In addition, clicking a node will select it, and double-clicking a parent node will toggle its expanded or collapsed state.

## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your change is tested or it won't be merged.

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

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
