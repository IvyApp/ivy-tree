# ivy-tree

[![Build Status](https://travis-ci.org/IvyApp/ivy-tree.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tree)

A group of [Ember.js Components] that interact to create a [WAI-ARIA tree]
interface.

## Installation

```sh
$ ember install ivy-tree
```

## Usage

Use the `ivy-tree` component to render a root node and all of its children,
recursively. Each descendant node will be yielded to the block you provide, so
you can tweak the markup:

```handlebars
{{#ivy-tree node=myNode as |nodeOrDescendant|}}
  {{nodeOrDescendant.name}}
{{/ivy-tree}}
```

The object assigned to the `node` property is expected to have a `children`
property which is set to an array of child nodes, if any. For example, you could
define a tree in your route's `model` hook like so:

```javascript
// app/routes/index.js

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      name: 'Root',
      children: [{
        name: 'Animals'
        children: [
          { name: 'Birds' },
          { name: 'Cats' },
          { name: 'Dogs' }
        ]
      }, {
        name: 'Minerals',
        children: [
          { name: 'Zinc' },
          { name: 'Gold' },
          { name: 'Silver' }
        ]
      }, {
        name: 'Vegetables',
        children: [
          { name: 'Carrot' },
          { name: 'Tomato' },
          { name: 'Lettuce' }
        ]
      }]
    };
  }
});
```

And then use `ivy-tree` in your template like so:

```handlebars
<!-- app/templates/index.hbs -->

{{#ivy-tree node=model as |nodeOrDescendant|}}
  {{nodeOrDescendant.name}}
{{/ivy-tree}}
```

Which would output a tree that looks like this:

  * Animals
    * Birds
    * Cats
    * Dogs
  * Minerals
    * Zinc
    * Gold
    * Silver
  * Vegetables
    * Carrot
    * Tomato
    * Lettuce

**Note that the "Root" node is not rendered.**

For a (slightly) more involved example, take a look at
[index.js](tests/dummy/app/routes/index.js) and
[index.hbs](tests/dummy/app/templates/index.hbs) inside the example app, under
`tests/dummy`.

### Keyboard Shortcuts

The following keyboard shortcuts are supported:

  * `Up`: Select the previous visible tree item.
  * `Down`: Select the next visible tree item.
  * `Left`: Collapse the selected node, if it has children and is expanded.
    Otherwise, select its parent node.
  * `Right`: Expand the selected node, if it has children and is collapsed.
    Select its first child node.
  * `Home`: Select the first visible tree item.
  * `End`: Select the last visible tree item.
  * `Enter`: Toggle the expanded or collapsed state of the selected node.
  * `*`: Expand all parent nodes in the tree.

In addition, clicking a node will select it, and double-clicking a parent node
will toggle its expanded or collapsed state.

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
[tree example]: http://cookiecrook.com/test/aria/tree/ariatree2.html
