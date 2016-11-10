import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ivy-tree', 'Integration | Component | ivy-tree', {
  integration: true
});

test('it applies a custom activeClass class to the active treeitem', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem activeClass="is-active"}}
    {{/ivy-tree}}
  `);

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.ok(this.$('[role="treeitem"][aria-level="1"]:eq(0)').hasClass('is-active'));
});

test('it sends an "onSelect" action when a treeitem is selected', function(assert) {
  assert.expect(1);

  this.on('onSelect', function() {
    assert.ok(true);
  });
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem onSelect=(action "onSelect")}}
    {{/ivy-tree}}
  `);

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
});

test('it sends an "onToggle" action when a treeitem is expanded', function(assert) {
  assert.expect(1);

  this.on('onToggle', function(isExpanded) {
    assert.equal(isExpanded, true);
  });
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem onToggle=(action "onToggle")}}
    {{/ivy-tree}}
  `);

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
});
