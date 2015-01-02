import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-tree', 'component:ivy-tree', {
  needs: [
    'component:ivy-tree-item',
    'component:ivy-tree-group',
    'component:ivy-tree-item-toggle',
  ]
});

var basicTemplate = Ember.Handlebars.compile(
  '{{#ivy-tree-item id="treeItem1"}}item 1' +
    '{{#ivy-tree-item-toggle id="treeToggle1"}}toggle 1{{/ivy-tree-item-toggle}}' +
    '{{#ivy-tree-group id="treeGroup1"}}' +
      '{{#ivy-tree-item}}subitem 1.1{{/ivy-tree-item}}' +
      '{{#ivy-tree-item}}subitem 1.2{{/ivy-tree-item}}' +
    '{{/ivy-tree-group}}' +
  '{{/ivy-tree-item}}' +
  '{{#ivy-tree-item id="treeItem2" isExpanded=false}}item 2' +
    '{{#ivy-tree-group id="treeGroup2"}}' +
      '{{#ivy-tree-item}}subitem 1.1{{/ivy-tree-item}}' +
      '{{#ivy-tree-item}}subitem 1.2{{/ivy-tree-item}}' +
    '{{/ivy-tree-group}}' +
  '{{/ivy-tree-item}}' +
  '{{#ivy-tree-item id="treeItem3"}}item 3{{/ivy-tree-item}}'
);

test('WAI-ARIA attributes', function() {
  var component = this.subject({
    template: basicTemplate,

    'aria-labelledby': 'test_label'
  });
  this.append();

  var tree = component.$();
  equal(tree.attr('aria-labelledby'), 'test_label', 'tree: aria-labelledby');
  equal(tree.attr('role'), 'tree', 'tree: role');

  var treeItem1 = component.$('#treeItem1');
  equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  equal(treeItem1.attr('role'), 'treeitem', 'tree-item: role');
  equal(treeItem1.attr('tabIndex'), '-1', 'tree-item: tabIndex');

  var treeGroup1 = component.$('#treeGroup1');
  equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');
  equal(treeGroup1.attr('role'), 'group', 'tree-group: role');
  ok(!treeGroup1.attr('tabIndex'), 'tree-group: carries no tabIndex');

  var treeToggle1 = component.$('#treeToggle1');
  equal(treeToggle1.attr('aria-hidden'), 'true', 'tree-toggle: aria-hidden true');
  ok(!treeToggle1.attr('tabIndex'), 'tree-group: carries no tabIndex');

  var treeItem2 = component.$('#treeItem2');
  equal(treeItem2.attr('aria-expanded'), 'false', 'tree-item: aria-expanded false');

  var treeGroup2 = component.$('#treeGroup2');
  equal(treeGroup2.attr('aria-hidden'), 'true', 'tree-group: aria-hidden true');

  var treeItem3 = component.$('#treeItem3');
  ok(!treeItem3.attr('aria-expanded'), 'tree-item: aria-expanded unused');
});
