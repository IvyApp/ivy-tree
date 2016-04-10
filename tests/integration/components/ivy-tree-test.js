import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

moduleForComponent('ivy-tree', 'Integration | Component | ivy-tree', {
  integration: true,

  beforeEach() {
    this.set('node', {
      name: 'Root',
      children: [{
        name: 'Animals',
        children: [{
          name: 'Birds'
        }, {
          name: 'Cats',
          children: [{
            name: 'Siamese'
          }, {
            name: 'Tabby'
          }]
        }, {
          name: 'Dogs',
          children: [{
            name: 'Small Breeds',
            children: [{
              name: 'Chihuahua'
            }, {
              name: 'Italian Greyhound'
            }, {
              name: 'Japanese Chin'
            }]
          }, {
            name: 'Medium Breeds',
            children: [{
              name: 'Beagle'
            }, {
              name: 'Cocker Spaniel'
            }, {
              name: 'Pit Bull'
            }]
          }, {
            name: 'Large Breeds',
            children: [{
              name: 'Afghan'
            }, {
              name: 'Great Dane'
            }, {
              name: 'Mastiff'
            }]
          }]
        }]
      }, {
        name: 'Minerals',
        children: [{
          name: 'Zinc'
        }, {
          name: 'Gold',
          children: [{
            name: 'Yellow Gold'
          }, {
            name: 'White Gold'
          }]
        }, {
          name: 'Silver'
        }]
      }, {
        name: 'Vegetables',
        children: [{
          name: 'Carrot'
        }, {
          name: 'Tomato'
        }, {
          name: 'Lettuce'
        }]
      }]
    });
  }
});

test('it applies an "aria-hidden" attribute to the children of a collapsed treeitem', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  assert.equal(this.$('[role="treeitem"]:eq(0)').attr('aria-expanded'), 'false');
  assert.equal(this.$('[role="treeitem"]:eq(0) [role="treeitem"]:eq(0)').attr('aria-hidden'), 'true');

  this.$('[role="treeitem"]:eq(0)').dblclick();
  assert.equal(this.$('[role="treeitem"]:eq(0) [role="treeitem"]:eq(0)').attr('aria-hidden'), 'false');
});

test('it applies an "aria-level" attribute to treeitems', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  assert.equal(this.$('[role="treeitem"][aria-level="1"]').length, 3);
  assert.equal(this.$('[role="treeitem"][aria-level="2"]').length, 9);
  assert.equal(this.$('[role="treeitem"][aria-level="3"]').length, 7);
  assert.equal(this.$('[role="treeitem"][aria-level="4"]').length, 9);
  assert.equal(this.$('[role="treeitem"][aria-level="5"]').length, 0);
});

test('it applies an "aria-selected" attribute to the active treeitem', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'false');

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'true');
});

test('it activates a treeitem on click', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), undefined);

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it applies an "active" class to the active treeitem', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.ok(this.$('[role="treeitem"][aria-level="1"]:eq(0)').hasClass('active'));
});

test('it applies a custom activeClass class to the active treeitem', function(assert) {
  this.render(hbs`{{ivy-tree activeClass="is-active" node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.ok(this.$('[role="treeitem"][aria-level="1"]:eq(0)').hasClass('is-active'));
});

test('it toggles expansion of a treeitem on double-click', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');

  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
});

test('it toggles expansion of the focused treeitem when enter key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 13 }));
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
});

test('it selects the previous sibling treeitem when up arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 38 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it selects the parent treeitem when up arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(1)').dblclick();
  this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 38 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it selects the next sibling treeitem when down arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 40 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(1)').attr('id'));
});

test('it selects the next sibling of the parent treeitem when down arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
  this.$('[role="treeitem"][aria-level="1"]:eq(0) [role="treeitem"][aria-level="2"]:last-child').click();

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 40 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(1)').attr('id'));
});

test('it collapses the (expanded) currently-focused node when left arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 37 }));
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it selects the parent of the (collapsed) currently-focused node when left arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').dblclick();
  this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').click();

  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').attr('id'));

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 37 }));
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('id'));
});

test('it expands a collapsed treeitem and selects its first child when right arrow key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);
  this.$('[role="treeitem"][aria-level="1"]:eq(0)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 39 }));
  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-expanded'), 'true');
  assert.equal(this.$('[role="tree"]').attr('aria-activedescendant'), this.$('[role="treeitem"][aria-level="1"] [role="treeitem"][aria-level="2"]:eq(0)').attr('id'));
});

test('it expands all treeitems when asterisk (shift+8) key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  assert.notEqual(this.$('[role="treeitem"][aria-expanded="false"]').length, 0);

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 56, shiftKey: true }));
  assert.equal(this.$('[role="treeitem"][aria-expanded="false"]').length, 0);
});

test('it selects the first, visible treeitem when home key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 36 }));

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(0)').attr('aria-selected'), 'true');
});

test('it selects the last, visible treeitem when end key is pressed', function(assert) {
  this.render(hbs`{{ivy-tree node=node}}`);

  this.$('[role="treeitem"][aria-level="1"]:eq(1)').click();

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(2)').attr('aria-selected'), 'false');

  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 35 }));

  assert.equal(this.$('[role="treeitem"][aria-level="1"]:eq(2)').attr('aria-selected'), 'true');

  // expand the last item to make deeper items visible.
  this.$('[role="treeitem"][aria-level="1"]:eq(2)').dblclick();
  this.$('[role="tree"]').trigger(Ember.$.Event('keydown', { keyCode: 35 }));

  assert.equal(this.$('[role="treeitem"][aria-level="2"]:eq(8)').attr('aria-selected'), 'true');
});
