import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

moduleForComponent('ivy-tree', 'Integration | Component | ivy-tree', {
  integration: true,

  beforeEach() {
    this.render(hbs`
      {{#ivy-tree as |tree|}}
        {{#tree.item as |item|}}
          Animals
          {{#item.group as |group|}}
            {{#group.item as |item|}}
              Birds
            {{/group.item}}
            {{#group.item as |item|}}
              Cats
              {{#item.group as |group|}}
                {{#group.item}}
                  Siamese
                {{/group.item}}
                {{#group.item}}
                  Tabby
                {{/group.item}}
              {{/item.group}}
            {{/group.item}}
            {{#group.item as |item|}}
              Dogs
              {{#item.group as |group|}}
                {{#group.item as |item|}}
                  Small Breeds
                  {{#item.group as |group|}}
                    {{#group.item}}
                      Chihuahua
                    {{/group.item}}
                    {{#group.item}}
                      Italian Greyhound
                    {{/group.item}}
                    {{#group.item}}
                      Japanese Chin
                    {{/group.item}}
                  {{/item.group}}
                {{/group.item}}
                {{#group.item as |item|}}
                  Medium Breeds
                  {{#item.group as |group|}}
                    {{#group.item}}
                      Beagle
                    {{/group.item}}
                    {{#group.item}}
                      Cocker Spaniel
                    {{/group.item}}
                    {{#group.item}}
                      Pit Bull
                    {{/group.item}}
                  {{/item.group}}
                {{/group.item}}
                {{#group.item as |item|}}
                  Large Breeds
                  {{#item.group as |group|}}
                    {{#group.item}}
                      Afghan
                    {{/group.item}}
                    {{#group.item}}
                      Great Dane
                    {{/group.item}}
                    {{#group.item}}
                      Mastiff
                    {{/group.item}}
                  {{/item.group}}
                {{/group.item}}
              {{/item.group}}
            {{/group.item}}
          {{/item.group}}
        {{/tree.item}}
        {{#tree.item activeClass="is-active" as |item|}}
          Minerals
          {{#item.group as |group|}}
            {{#group.item}}
              Zinc
            {{/group.item}}
            {{#group.item as |item|}}
              Gold
              {{#item.group as |group|}}
                {{#group.item}}
                  Yellow Gold
                {{/group.item}}
                {{#group.item}}
                  White Gold
                {{/group.item}}
              {{/item.group}}
            {{/group.item}}
            {{#group.item}}
              Silver
            {{/group.item}}
          {{/item.group}}
        {{/tree.item}}
        {{#tree.item as |item|}}
          Vegetables
          {{#item.group as |group|}}
            {{#group.item}}
              Carrot
            {{/group.item}}
            {{#group.item}}
              Tomato
            {{/group.item}}
            {{#group.item}}
              Lettuce
            {{/group.item}}
          {{/item.group}}
        {{/tree.item}}
      {{/ivy-tree}}
    `);
  }
});

test('it applies an "aria-hidden" attribute to the children of a collapsed treeitem', function(assert) {
  assert.equal(this.$('[role="treeitem"]:eq(0)').attr('aria-expanded'), 'false');
  assert.equal(this.$('[role="treeitem"]:eq(0) [role="treeitem"]:eq(0)').attr('aria-hidden'), 'true');

  this.$('[role="treeitem"]:eq(0)').dblclick();
  assert.equal(this.$('[role="treeitem"]:eq(0) [role="treeitem"]:eq(0)').attr('aria-hidden'), 'false');
});

test('it applies an "aria-level" attribute to treeitems', function(assert) {
  assert.equal(this.$('[role="treeitem"][aria-level="1"]').length, 3);
  assert.equal(this.$('[role="treeitem"][aria-level="2"]').length, 9);
  assert.equal(this.$('[role="treeitem"][aria-level="3"]').length, 7);
  assert.equal(this.$('[role="treeitem"][aria-level="4"]').length, 9);
  assert.equal(this.$('[role="treeitem"][aria-level="5"]').length, 0);
});

test('it applies an "aria-selected" attribute to the active treeitem', function(assert) {
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'false');

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'true');
});

test('it activates a treeitem on click', function(assert) {
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), undefined);

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it applies an "active" class to the active treeitem', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.ok(this.$('[role="treeitem"][aria-level="1"]:eq(0)').hasClass('active'));
});

test('it applies a custom activeClass class to the active treeitem', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  assert.ok(this.$('[role="treeitem"][aria-level="1"]:eq(1)').hasClass('is-active'));
});

test('it toggles expansion of a treeitem on double-click', function(assert) {
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
});

test('it toggles expansion of the focused treeitem when enter key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 13 }));
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
});

test('it selects the previous sibling treeitem when up arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 38 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it selects the parent treeitem when up arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').dblclick();
  this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 38 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it selects the next sibling treeitem when down arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 40 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(1)').attr('id'));
});

test('it selects the next sibling of the parent treeitem when down arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
  this.$('[role="treeitem"][aria-level="1"]:eq(0) [role="treeitem"][aria-level="2"]:last-child').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 40 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(1)').attr('id'));
});

test('it collapses the (expanded) currently-focused node when left arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 37 }));
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it selects the parent of the (collapsed) currently-focused node when left arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
  this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').click();

  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').attr('id'));

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 37 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it expands a collapsed treeitem and selects its first child when right arrow key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 39 }));
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').attr('id'));
});

test('it expands all treeitems when asterisk (shift+8) key is pressed', function(assert) {
  assert.notEqual(this.$('[role="treeitem"][aria-expanded="false"]').length, 0);

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 56, shiftKey: true }));
  assert.equal(this.$('[role="treeitem"][aria-expanded="false"]').length, 0);
});

test('it selects the first, visible treeitem when home key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 36 }));

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'true');
});

test('it selects the last, visible treeitem when end key is pressed', function(assert) {
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(2)').attr('aria-selected'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 35 }));

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(2)').attr('aria-selected'), 'true');

  // expand the last item to make deeper items visible.
  this.$('[role="treeitem"][aria-level="1"]:eq(2)').dblclick();
  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 35 }));

  assert.equal(this.$('[role="treeitem"][aria-level="2"]:eq(8)').attr('aria-selected'), 'true');
});
