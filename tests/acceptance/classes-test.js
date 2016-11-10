import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | classes');

test('the active treeitem is .active', function(assert) {
  visit('/');
  click('[role="treeitem"][aria-level="1"]:contains("Fruits")');

  andThen(() => {
    assert.ok(findWithAssert('[role="treeitem"][aria-level="1"]:contains("Fruits")').hasClass('active'));
  });
});
