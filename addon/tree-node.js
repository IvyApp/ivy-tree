import EmberObject from 'ember-object';
import TreeNodeMixin from './mixins/tree-node';
import computed from 'ember-computed';

export default EmberObject.extend(TreeNodeMixin, {
  collapse() {
    this.set('expanded', false);
  },

  depth: computed('parentNode.depth', function() {
    const parentNode = this.get('parentNode');

    if (parentNode) {
      return parentNode.get('depth') + 1;
    } else {
      return 0;
    }
  }).readOnly(),

  expand() {
    this.set('expanded', true);
  },

  expanded: false
}).reopenClass({
  build(array, parent=null, parentNode=null) {
    if (!parentNode) {
      parentNode = this.create({
        expanded: true
      });
    }

    if (array) {
      array.forEach((item) => {
        if (item.parent !== parent) {
          return;
        }

        const newChild = this.create({
          expanded : !!item.expanded,
          id       : item.id,
          label    : item.label
        });

        parentNode.appendChild(newChild);
        this.build(array, item.id, newChild);
      });
    }

    return parentNode;
  }
});
