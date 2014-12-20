import Ember from 'ember';

/**
 * @module ivy-tree
 */

/**
 * @class IvyTreeComponent
 * @namespace IvyTree
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  attributeBindings: ['aria-hidden', 'role'],
  classNames: ['ivy-tree-group'],
  tagName: 'ul',

  init: function() {
    this._super();
    Ember.run.once(this, this._registerWithTreeItemContainer);
  },

  willDestroy: function() {
    this._super();
    Ember.run.once(this, this._unregisterWithTreeItemContainer);
  },

  'aria-hidden': Ember.computed(function() {
    return (!this.get("treeItemContainer.isExpanded")) + ''; // coerce to 'true' or 'false'
  }).property("treeItemContainer.isExpanded"),

  role: 'group',

  /**
   * The `ivy-tree-item` component in which the group is defined.
   *
   * @property treeItemContainer
   * @type IvyTree.IvyTreeItemComponent
   * @readOnly
   */
  treeItemContainer: Ember.computed.alias('parentView').readOnly(),

  _registerWithTreeItemContainer: function() {
    this.get('treeItemContainer').registerTreeGroup(this);
  },

  _unregisterWithTreeItemContainer: function() {
    this.get('treeItemContainer').unregisterTreeGroup(this);
  }
});
