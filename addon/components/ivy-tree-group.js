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
  attributeBindings: ['aria-hidden', 'role'],
  classNames: ['ivy-tree-group'],
  tagName: 'ul',
  layout,

  init() {
    this._super(...arguments);
    Ember.run.once(this, this._registerWithItemContainer);
  },

  willDestroy() {
    this._super(...arguments);
    Ember.run.once(this, this._unregisterWithItemContainer);
  },

  'aria-hidden': Ember.computed('itemContainer.isExpanded', function() {
    const itemContainer = this.get('itemContainer');

    if (itemContainer) {
      return (!this.get('itemContainer.isExpanded')) + '';
    } else {
      return 'false';
    }
  }),

  role: 'group',

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
  },

  items: Ember.computed(function() {
    return Ember.A();
  }).readOnly(),

  registerItem(item) {
    this.get('items').pushObject(item);
  },

  unregisterItem(item) {
    this.get('items').removeObject(item);
  }
});
