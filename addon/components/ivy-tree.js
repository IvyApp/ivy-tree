import IvyTreeGroupComponent from 'ivy-tree/components/ivy-tree-group';

/**
 * @module ivy-tree
 */

/**
 * @class IvyTreeComponent
 * @namespace IvyTree
 * @extends IvyTreeGroupComponent
 */
export default IvyTreeGroupComponent.extend({
  'aria-multiselectable': 'false',

  attributeBindings: ['aria-labelledby', 'aria-multiselectable'],

  classNames: ['ivy-tree'],

  role: 'tree'
});
