import Controller from 'ember-controller';

export default Controller.extend({
  actions: {
    collapse(node) {
      node.collapse();
    },

    expand(node) {
      node.expand();
    }
  }
});
