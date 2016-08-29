import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | mouse interaction');

test('clicking on a node selects it', function(assert) {
  visit('/');
  click('[role="treeitem"]:contains("Fruits")');

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-selected="true"]'));
  });

  click('[role="treeitem"]:contains("Vegetables")');

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Vegetables")').is('[aria-selected="true"]'));
  });
});

test('double-clicking on a parent node toggles its expanded or collapsed state', function(assert) {
  visit('/');
  triggerEvent('[role="treeitem"]:contains("Fruits")', 'dblclick');

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-expanded="true"]'));
  });

  triggerEvent('[role="treeitem"]:contains("Fruits")', 'dblclick');

  andThen(function() {
    assert.ok(findWithAssert('[role="treeitem"]:contains("Fruits")').is('[aria-expanded="false"]'));
  });
});
