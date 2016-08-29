import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | keyboard interaction');

test('up arrow selects the previous visible tree item', function(assert) {
  visit('/');
  triggerEvent('[role="treeitem"]:contains("Fruits")', 'dblclick');
  click('[role="treeitem"]:contains("Vegetables")');
  keyEvent('[role="tree"]', 'keydown', 38);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Pears")').is('[aria-selected="true"]'));
  });

  keyEvent('[role="tree"]', 'keydown', 38);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Bananas")').is('[aria-selected="true"]'));
  });
});

test('down arrow selects the next visible tree item', function(assert) {
  visit('/');
  keyEvent('[role="tree"]', 'keydown', 40);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-selected="true"]'));
  });

  triggerEvent('[role="treeitem"]:contains("Vegetables")', 'dblclick');
  click('[role="treeitem"]:contains("Fruits")');
  keyEvent('[role="tree"]', 'keydown', 40);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Vegetables")').is('[aria-selected="true"]'));
  });

  keyEvent('[role="tree"]', 'keydown', 40);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Broccoli")').is('[aria-selected="true"]'));
  });
});

test('left arrow moves to the previous parent node when the currently selected parent node is collapsed', function(assert) {
  visit('/');
  triggerEvent('[role="treeitem"]:contains("Vegetables")', 'dblclick');
  click('[role="treeitem"]:contains("Lettuce")');
  keyEvent('[role="tree"]', 'keydown', 37);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Vegetables")').is('[aria-selected="true"]'));
  });
});

test('left arrow collapses the currently selected parent node if it is expanded', function(assert) {
  visit('/');
  click('[role="treeitem"]:contains("Fruits")');
  triggerEvent('[role="treeitem"]:contains("Fruits")', 'dblclick');
  keyEvent('[role="tree"]', 'keydown', 37);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-expanded="false"]'));
  });
});

test('right arrow expands the currently selected parent node and moves to its first child node', function(assert) {
  visit('/');
  click('[role="treeitem"]:contains("Fruits")');
  keyEvent('[role="tree"]', 'keydown', 39);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-expanded="true"]'));
    assert.ok(findWithAssert('[role="treeitem"]:contains("Oranges")').is('[aria-selected="true"]'));
  });
});

test('enter toggles the expanded or collapsed state of the selected parent node', function(assert) {
  visit('/');
  click('[role="treeitem"]:contains("Fruits")');
  keyEvent('[role="tree"]', 'keydown', 13);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-expanded="true"]'));
  });

  keyEvent('[role="tree"]', 'keydown', 13);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-expanded="false"]'));
  });
});

test('home selects the root parent node of the tree', function(assert) {
  visit('/');
  click('[role="treeitem"]:contains("Vegetables")');
  keyEvent('[role="tree"]', 'keydown', 36);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-selected="true"]'));
  });
});

test('end selects the last visible node of the tree', function(assert) {
  visit('/');
  click('[role="treeitem"]:contains("Fruits")');
  keyEvent('[role="tree"]', 'keydown', 35);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Vegetables")').is('[aria-selected="true"]'));
  });

  triggerEvent('[role="treeitem"]:contains("Vegetables")', 'dblclick');
  keyEvent('[role="tree"]', 'keydown', 35);

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Squash")').is('[aria-selected="true"]'));
  });
});

test('asterisk expands all parent nodes', function(assert) {
  visit('/');
  triggerEvent('[role="tree"]', 'keydown', { keyCode: 56, shiftKey: true });

  andThen(function() {
    assert.equal(find('[role="treeitem"][aria-expanded="true"]').length, 6);
  });
});
