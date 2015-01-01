import Ember from 'ember';

/**
 * @module ivy-tree
 */

/**
 * @class IvyTreeItemToggleComponent
 * @namespace IvyTree
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  attributeBindings: ['aria-hidden', 'role'],
  classNameBindings: ['componentClass'],

  'aria-hidden': 'true',

  componentClass: 'ivy-tree-item-toggle',

  toggleIsExpanded: Ember.on('click', function(e) {
    this.get('treeItemContainer').toggleIsExpanded(e);
  }),

  /**
   * The `ivy-tree-item` component in which the group is defined.
   *
   * @property treeItemContainer
   * @type IvyTree.IvyTreeItemComponent
   * @readOnly
   */
  treeItemContainer: Ember.computed.alias('parentView').readOnly(),
});
