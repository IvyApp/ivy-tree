import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';

moduleForComponent('ivy-tree', 'Integration | Component | ivy tree', {
  integration: true
});

const template = hbs`
  {{#ivy-tree aria-labelledby="test_label" as |tree|}}
    {{#tree.item id="treeItem1" expandedClass="expanded-class-name" as |item|}}item 1
      {{#item.group id="treeGroup1" as |group|}}
        {{#group.item}}subitem 1.1{{/group.item}}
        {{#group.item}}subitem 1.2{{/group.item}}
      {{/item.group}}
    {{/tree.item}}
    {{#tree.item id="treeItem2" isExpanded=false collapsedClass="collapsed-class-name" as |item|}}item 2
      {{#item.group id="treeGroup2" as |group|}}
        {{#group.item}}subitem 1.1{{/group.item}}
        {{#group.item}}subitem 1.2{{/group.item}}
      {{/item.group}}
    {{/tree.item}}
    {{#tree.item id="treeItem3"}}item 3{{/tree.item}}
  {{/ivy-tree}}
`;

test('WAI-ARIA attributes', function(assert) {
  this.render(template);

  const tree = this.$('.ivy-tree');
  assert.equal(tree.attr('aria-labelledby'), 'test_label', 'tree: aria-labelledby');
  assert.equal(tree.attr('aria-multiselectable'), 'false', 'tree: aria-multiselectable');
  assert.equal(tree.attr('role'), 'tree', 'tree: role');

  const treeItem1 = this.$('#treeItem1');
  assert.equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  assert.equal(treeItem1.attr('role'), 'treeitem', 'tree-item: role');
  assert.equal(treeItem1.attr('tabIndex'), '-1', 'tree-item: tabIndex');

  const treeGroup1 = this.$('#treeGroup1');
  assert.equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');
  assert.equal(treeGroup1.attr('role'), 'group', 'tree-group: role');
  assert.ok(!treeGroup1.attr('tabIndex'), 'tree-group: carries no tabIndex');

  const treeItem2 = this.$('#treeItem2');
  assert.equal(treeItem2.attr('aria-expanded'), 'false', 'tree-item: aria-expanded false');

  const treeGroup2 = this.$('#treeGroup2');
  assert.equal(treeGroup2.attr('aria-hidden'), 'true', 'tree-group: aria-hidden true');

  const treeItem3 = this.$('#treeItem3');
  assert.ok(!treeItem3.attr('aria-expanded'), 'tree-item: aria-expanded unused');
});

test('sets an optional expandedItemClass class when expanded', function(assert) {
  this.render(template);
  assert.ok(this.$('#treeItem1').hasClass('expanded-class-name'), 'tree-item: expandedClass');
});

test('sets an optional collapsedItemClass class when collapsed', function(assert) {
  this.render(template);

  assert.ok(this.$('#treeItem2').hasClass('collapsed-class-name'), 'tree-item: collapsedClass');
});

test('double-click toggles the clicked parent node expansion', function(assert) {
  this.render(template);

  const treeItem1 = this.$('#treeItem1');
  const treeGroup1 = this.$('#treeGroup1');

  assert.equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  assert.equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');

  run(function() {
    treeItem1.trigger('dblclick');
  });

  assert.equal(treeItem1.attr('aria-expanded'), 'false', 'tree-item: aria-expanded false');
  assert.equal(treeGroup1.attr('aria-hidden'), 'true', 'tree-group: aria-hidden true');

  run(function() {
    treeItem1.trigger('dblclick');
  });

  assert.equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  assert.equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');
});

test('items yield a toggle action', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{#tree.item id="treeItem1" as |item|}}
        item 1
        <button onclick={{action item.toggle}}>Toggle</button>
        {{#item.group as |group|}}
          {{#group.item}}subitem 1.1{{/group.item}}
        {{/item.group}}
      {{/tree.item}}
    {{/ivy-tree}}
  `);

  const button = this.$('button');
  const item = this.$('#treeItem1');

  assert.equal(item.attr('aria-expanded'), 'true', 'tree-item: aria-expanded');

  run(function() {
    button.click();
  });

  assert.equal(item.attr('aria-expanded'), 'false', 'tree-item: aria-expanded');

  run(function() {
    button.click();
  });

  assert.equal(item.attr('aria-expanded'), 'true', 'tree-item: aria-expanded');
});

test('items yield an open action', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{#tree.item id="treeItem1" isExpanded=false as |item|}}
        item 1
        <button onclick={{action item.open}}>Toggle</button>
        {{#item.group as |group|}}
          {{#group.item}}subitem 1.1{{/group.item}}
        {{/item.group}}
      {{/tree.item}}
    {{/ivy-tree}}
  `);

  const button = this.$('button');
  const item = this.$('#treeItem1');

  assert.equal(item.attr('aria-expanded'), 'false', 'tree-item: aria-expanded');

  run(function() {
    button.click();
  });

  assert.equal(item.attr('aria-expanded'), 'true', 'tree-item: aria-expanded');

  run(function() {
    button.click();
  });

  assert.equal(item.attr('aria-expanded'), 'true', 'tree-item: aria-expanded');
});

test('items yield a close action', function(assert) {
  this.render(hbs`
    {{#ivy-tree as |tree|}}
      {{#tree.item id="treeItem1" isExpanded=true as |item|}}
        item 1
        <button onclick={{action item.close}}>Toggle</button>
        {{#item.group as |group|}}
          {{#group.item}}subitem 1.1{{/group.item}}
        {{/item.group}}
      {{/tree.item}}
    {{/ivy-tree}}
  `);

  const button = this.$('button');
  const item = this.$('#treeItem1');

  assert.equal(item.attr('aria-expanded'), 'true', 'tree-item: aria-expanded');

  run(function() {
    button.click();
  });

  assert.equal(item.attr('aria-expanded'), 'false', 'tree-item: aria-expanded');

  run(function() {
    button.click();
  });

  assert.equal(item.attr('aria-expanded'), 'false', 'tree-item: aria-expanded');
});
