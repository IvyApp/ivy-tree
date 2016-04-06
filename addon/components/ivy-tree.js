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
  attributeBindings: ['aria-labelledby'],
  classNames: ['ivy-tree'],
  role: 'tree'
});
