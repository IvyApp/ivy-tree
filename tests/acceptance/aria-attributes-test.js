import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | ARIA attributes');

test('items have an aria-level attribute', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(find('[role="treeitem"][aria-level="1"]').length, 2);
    assert.equal(find('[role="treeitem"][aria-level="2"]').length, 10);
    assert.equal(find('[role="treeitem"][aria-level="3"]').length, 15);
    assert.equal(find('[role="treeitem"][aria-level="4"]').length, 3);
  });
});

test('top-level items are [aria-hidden="false"]', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="1"]:contains("Fruits")').attr('aria-hidden'), 'false');
  });
});

test('children of a collapsed treeitem are [aria-hidden="true"]', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="2"]:contains("Oranges")').attr('aria-hidden'), 'true');
  });
});

test('children of an expanded treeitem are [aria-hidden="false"]', function(assert) {
  visit('/');
  triggerEvent('[role="treeitem"][aria-level="1"]:contains("Fruits")', 'dblclick');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="2"]:contains("Oranges")').attr('aria-hidden'), 'false');
  });
});

test('the active treeitem is [aria-selected="true"]', function(assert) {
  visit('/');
  click('[role="treeitem"][aria-level="1"]:contains("Fruits")');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="1"]:contains("Fruits")').attr('aria-selected'), 'true');
  });
});

test('collapsed parent nodes are [aria-expanded="true"]', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="1"]:contains("Fruits")').attr('aria-expanded'), 'false');
  });
});

test('expanded parent nodes are [aria-expanded="true"]', function(assert) {
  visit('/');
  triggerEvent('[role="treeitem"][aria-level="1"]:contains("Fruits")', 'dblclick');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="1"]:contains("Fruits")').attr('aria-expanded'), 'true');
  });
});

test('leaf nodes are [aria-expanded="false"]', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert('[role="treeitem"][aria-level="2"]:contains("Oranges")').attr('aria-expanded'), 'false');
  });
});
