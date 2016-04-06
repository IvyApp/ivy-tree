import Ember from 'ember';
import layout from 'ivy-tree/templates/components/ivy-tree-item';

/**
 * @module ivy-tree-item
 */

/**
 * @class IvyTreeItemComponent
 * @namespace IvyTree
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  attributeBindings: ['aria-expanded', 'role', 'tabindex'],
  classNames: ['ivy-tree-item'],
  classNameBindings: ['collapsed', 'expanded'],
  collapsedClass: null,
  expandedClass: null,
  isExpanded: true,
  layout,
  tagName: 'li',

  'aria-expanded': Ember.computed('hasGroup', 'isExpanded', function() {
    if (this.get('hasGroup')) {
      return this.get('isExpanded') + '';
    }
  }),

  collapsed: Ember.computed('collapsedClass', 'hasGroup', 'isExpanded', function() {
    if (this.get('hasGroup') && !this.get('isExpanded')) {
      return this.get('collapsedClass');
    }
  }),

  expanded: Ember.computed('expandedClass', 'hasGroup', 'isExpanded', function() {
    if (this.get('hasGroup') && this.get('isExpanded')) {
      return this.get('expandedClass');
    }
  }),

  hasGroup: Ember.computed.notEmpty('group'),

  registerGroup: function(group) {
    this.set('group', group);
  },

  role: 'treeitem',

  tabindex: -1,

  toggleIsExpanded: function() {
    this.toggleProperty('isExpanded');
  },

  toggleIsExpandedOnDoubleClick: Ember.on('doubleClick', function(e) {
    this.toggleIsExpanded();
    e.stopPropagation();
  }),

  unregisterGroup: function(group) {
    if (group === this.get('group')) {
      this.set('group', null);
    } else {
      throw new Error('boom. bad group.');
    }
  },

  init() {
    this._super(...arguments);
    Ember.run.once(this, this._registerWithGroupContainer);
  },

  willDestroy() {
    this._super(...arguments);
    Ember.run.once(this, this._unregisterWithGroupContainer);
  },

  _registerWithGroupContainer() {
    this.get('groupContainer').registerItem(this);
  },

  _unregisterWithGroupContainer() {
    this.get('groupContainer').unregisterItem(this);
  }
});
