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
  actions: {
    close() {
      this.set('isExpanded', false);
    },

    open() {
      this.set('isExpanded', true);
    },

    toggle() {
      this.toggleProperty('isExpanded');
    }
  },

  'aria-expanded': Ember.computed('hasGroup', 'isExpanded', function() {
    if (this.get('hasGroup')) {
      return this.get('isExpanded') + '';
    }
  }),

  attributeBindings: ['aria-expanded', 'role', 'tabindex'],

  classNameBindings: ['collapsed', 'expanded'],

  classNames: ['ivy-tree-item'],

  collapsed: Ember.computed('collapsedClass', 'hasGroup', 'isExpanded', function() {
    if (this.get('hasGroup') && !this.get('isExpanded')) {
      return this.get('collapsedClass');
    }
  }),

  collapsedClass: null,

  expanded: Ember.computed('expandedClass', 'hasGroup', 'isExpanded', function() {
    if (this.get('hasGroup') && this.get('isExpanded')) {
      return this.get('expandedClass');
    }
  }),

  expandedClass: null,

  hasGroup: Ember.computed.notEmpty('group'),

  init() {
    this._super(...arguments);
    Ember.run.once(this, this._registerWithGroupContainer);
  },

  isExpanded: true,

  layout,

  tagName: 'li',

  registerGroup: function(group) {
    this.set('group', group);
  },

  role: 'treeitem',

  tabindex: -1,

  toggleIsExpandedOnDoubleClick: Ember.on('doubleClick', function(e) {
    this.toggleProperty('isExpanded');
    e.stopPropagation();
  }),

  unregisterGroup: function(group) {
    if (group === this.get('group')) {
      this.set('group', null);
    } else {
      throw new Error('boom. bad group.');
    }
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
