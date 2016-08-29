import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ivy-tree', 'Integration | Component | ivy-tree', {
  integration: true
});

test('top-level items are aria-hidden=false', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem}}
    {{/ivy-tree}}
  `);

  assert.equal(this.$('[role="treeitem"]').attr('aria-hidden'), 'false');
});

test('it applies an "aria-hidden" attribute to the children of a collapsed treeitem', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{#tree.treeitem as |treeitem|}}
        {{#treeitem.group as |group|}}
          {{group.treeitem}}
        {{/treeitem.group}}
      {{/tree.treeitem}}
    {{/ivy-tree}}
  `);

  assert.equal(this.$('[role="treeitem"]:eq(0)').attr('aria-expanded'), 'false');
  assert.equal(this.$('[role="treeitem"]:eq(0) [role="treeitem"]:eq(0)').attr('aria-hidden'), 'true');

  this.$('[role="treeitem"]:eq(0)').dblclick();
  assert.equal(this.$('[role="treeitem"]:eq(0) [role="treeitem"]:eq(0)').attr('aria-hidden'), 'false');
});

test('it applies an "aria-level" attribute to treeitems', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{#tree.treeitem as |treeitem|}}
        {{#treeitem.group as |group|}}
          {{group.treeitem}}
        {{/treeitem.group}}
      {{/tree.treeitem}}
    {{/ivy-tree}}
  `);

  assert.equal(this.$('[role="treeitem"]:eq(0)').attr('aria-level'), '1');
  assert.equal(this.$('[role="treeitem"]:eq(1)').attr('aria-level'), '2');
});

test('it applies an "aria-selected" attribute to the active treeitem', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem}}
    {{/ivy-tree}}
  `);

  assert.equal(this.$('[role="treeitem"]:eq(0)').attr('aria-selected'), 'false');

  this.$('[role="treeitem"]:eq(0)').click();
  assert.equal(this.$('[role="treeitem"]:eq(0)').attr('aria-selected'), 'true');
});

test('it applies an "active" class to the active treeitem', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem}}
    {{/ivy-tree}}
  `);

  this.$('[role="treeitem"]:eq(0)').click();

  assert.ok(this.$('[role="treeitem"]:eq(0)').hasClass('active'));
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

test('treeitem does not carry an aria-expanded attribute when it is a leaf node', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{tree.treeitem}}
    {{/ivy-tree}}
  `);

  assert.notOk(!!this.$('[role="treeitem"]:eq(0)').is('[aria-expanded]'));

  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{#tree.treeitem as |treeitem|}}
        {{#treeitem.group as |group|}}
        {{/treeitem.group}}
      {{/tree.treeitem}}
    {{/ivy-tree}}
  `);

  assert.notOk(!!this.$('[role="treeitem"]:eq(0)').is('[aria-expanded]'));
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
