import Controller from 'ember-controller';

export default Controller.extend({
  actions: {
    collapseNode(node) {
      node.collapse();
    },

    expandNode(node) {
      node.expand();
    }
  }
});
