# ivy-tree Changelog

* Always render `aria-expanded` properties on treeitem nodes. This is a not-so-ideal solution for avoiding the Ember deprecation warnings for assigning a property multiple times in a single render loop (see Ember's `[deprecation id: ember-views.render-double-modify]`).

## 0.1.1 (August 11, 2016)

* Pressing the down arrow when there is no selected treeitem now selects the first one, if any.
* The `isExpanded` property of `ivy-treeitem` can now be passed in from outside, and updated via the `onToggle` action which will be sent when a treeitem is toggled open or closed.
* Fix an issue where pressing the down arrow at the end of the tree would call `preventDefault` and `stopPropagation`, stopping the user from being able to scroll the page.

## 0.1.0 (August 9, 2016)

* Initial release.
