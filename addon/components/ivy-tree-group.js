import Ember from 'ember';
import layout from 'ivy-tree/templates/components/ivy-tree-group';

/**
 * @module ivy-tree-group
 */

/**
 * @class IvyTreeGroupComponent
 * @namespace IvyTree
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  'aria-hidden': Ember.computed('itemContainer.isExpanded', function() {
    const itemContainer = this.get('itemContainer');

    if (itemContainer) {
      return (!this.get('itemContainer.isExpanded')) + '';
    } else {
      return 'false';
    }
  }),

  attributeBindings: ['aria-hidden', 'role'],

  classNames: ['ivy-tree-group'],

  init() {
    this._super(...arguments);
    Ember.run.once(this, this._registerWithItemContainer);
  },

  items: Ember.computed(function() {
    return Ember.A();
  }).readOnly(),

  layout,

  registerItem(item) {
    this.get('items').pushObject(item);
  },

  role: 'group',

  tagName: 'ul',

  unregisterItem(item) {
    this.get('items').removeObject(item);
  },

  willDestroy() {
    this._super(...arguments);
    Ember.run.once(this, this._unregisterWithItemContainer);
  },

  _registerWithItemContainer: function() {
    const itemContainer = this.get('itemContainer');

    if (itemContainer) {
      itemContainer.registerGroup(this);
    }
  },

  _unregisterWithItemContainer: function() {
    const itemContainer = this.get('itemContainer');

    if (itemContainer) {
      itemContainer.unregisterGroup(this);
    }
  }
});
