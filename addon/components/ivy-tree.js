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
  attributeBindings: ['aria-labelledby', 'role'],
  classNames: ['ivy-tree'],
  tagName: 'ul',

  'aria-labelledby': null,
  role: 'tree'
});
