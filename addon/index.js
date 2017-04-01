import TreeNode from './tree-node';

export function buildTree(array, parent=null, parentNode=null) {
  if (!parentNode) {
    parentNode = TreeNode.create({
      expanded: true
    });
  }

  if (array) {
    array.forEach(item => {
      if (item.parent !== parent) {
        return;
      }

      const newChild = TreeNode.create({
        expanded : !!item.expanded,
        id       : item.id,
        label    : item.label
      });

      parentNode.appendChild(newChild);
      buildTree(array, item.id, newChild);
    });
  }

  return parentNode;
}
