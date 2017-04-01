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
});
