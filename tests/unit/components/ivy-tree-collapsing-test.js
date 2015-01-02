import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-tree', 'component:ivy-tree collapsing', {
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

test('sets an optional expandedItemClass class when expanded', function() {
  var component = this.subject({
    template: basicTemplate,
    expandedItemClass: 'expanded-class-name'
  });
  this.append();

  var treeItem1 = component.$('#treeItem1');
  ok(treeItem1.hasClass('expanded-class-name'), 'tree-item: expandedClass');
});

test('sets an optional collapsedItemClass class when collapsed', function() {
  var component = this.subject({
    template: basicTemplate,
    collapsedItemClass: 'collapsed-class-name'
  });
  this.append();

  var treeItem2 = component.$('#treeItem2');
  ok(treeItem2.hasClass('collapsed-class-name'), 'tree-item: collapsedClass');
});

test('double-click toggles the clicked parent node expansion', function() {
  var component = this.subject({
    template: basicTemplate
  });
  this.append();

  var treeItem1 = component.$('#treeItem1');
  var treeGroup1 = component.$('#treeGroup1');

  equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');

  Ember.run(function() {
    treeItem1.trigger('dblclick');
  });

  equal(treeItem1.attr('aria-expanded'), 'false', 'tree-item: aria-expanded false');
  equal(treeGroup1.attr('aria-hidden'), 'true', 'tree-group: aria-hidden true');

  Ember.run(function() {
    treeItem1.trigger('dblclick');
  });

  equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');
});

test('clicking on a toggle element toggles the parent node expansion', function() {
  var component = this.subject({
    template: basicTemplate
  });
  this.append();

  var treeItem1 = component.$('#treeItem1');
  var treeGroup1 = component.$('#treeGroup1');
  var treeToggle1 = component.$('#treeToggle1');

  equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');

  Ember.run(function() {
    treeToggle1.click();
  });

  equal(treeItem1.attr('aria-expanded'), 'false', 'tree-item: aria-expanded false');
  equal(treeGroup1.attr('aria-hidden'), 'true', 'tree-group: aria-hidden true');

  Ember.run(function() {
    treeToggle1.click();
  });

  equal(treeItem1.attr('aria-expanded'), 'true', 'tree-item: aria-expanded true');
  equal(treeGroup1.attr('aria-hidden'), 'false', 'tree-group: aria-hidden false');
});