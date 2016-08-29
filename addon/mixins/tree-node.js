import Mixin from 'ember-metal/mixin';
import computed from 'ember-computed';

export default Mixin.create({
  treeNodeAfter(newChild) {
    const treeNodeNextSibling = this.get('treeNodeNextSibling');

    if (treeNodeNextSibling) {
      treeNodeNextSibling.set('treeNodePreviousSibling', newChild);
    }

    const treeNodeParent = this.get('treeNodeParent');

    if (treeNodeParent && treeNodeParent.get('treeNodeLastChild') === this) {
      treeNodeParent.set('treeNodeLastChild', newChild);
    }

    newChild.set('treeNodeParent', treeNodeParent);
    newChild.set('treeNodePreviousSibling', this);
    newChild.set('treeNodeNextSibling', treeNodeNextSibling);
    this.set('treeNodeNextSibling', newChild);
  },

  treeNodeAttach() {
    const treeNodeParent = this.get('treeNodeParent');

    if (treeNodeParent) {
      treeNodeParent.treeNodeInsertBefore(this, this.get('treeNodeNextSibling'));
    }
  },

  treeNodeDetach() {
    const treeNodeParent = this.get('treeNodeParent');

    if (treeNodeParent) {
      treeNodeParent.treeNodeRemoveChild(this);
    }
  },

  treeNodeFirstChild: null,

  treeNodeHasChildren: computed('treeNodeFirstChild', function() {
    return this.get('treeNodeFirstChild') !== null;
  }).readOnly(),

  treeNodeInsertBefore(newChild, refChild) {
    if (newChild === refChild) {
      return;
    }

    newChild.treeNodeDetach();

    if (refChild === null) {
      const treeNodeLastChild = this.get('treeNodeLastChild');

      if (treeNodeLastChild) {
        treeNodeLastChild.treeNodeAfter(newChild);
      } else {
        newChild.set('treeNodeParent', this);
        this.set('treeNodeFirstChild', newChild);
        this.set('treeNodeLastChild', newChild);
      }
    } else {
      const treeNodePreviousSibling = refChild.get('treeNodePreviousSibling');

      if (treeNodePreviousSibling) {
        treeNodePreviousSibling.set('treeNodeNextSibling', newChild);
      }

      if (refChild === this.get('treeNodeFirstChild')) {
        this.set('treeNodeFirstChild', newChild);
      }

      newChild.set('treeNodeNextSibling', refChild);
      newChild.set('treeNodePreviousSibling', treeNodePreviousSibling);
      refChild.set('treeNodePreviousSibling', newChild);
    }

    newChild.set('treeNodeParent', this);
  },

  treeNodeLastChild: null,

  treeNodeNextSibling: null,

  treeNodeParent: null,

  treeNodePreviousSibling: null,

  treeNodeRemoveChild(oldChild) {
    const treeNodeNextSibling = oldChild.get('treeNodeNextSibling');
    const treeNodePreviousSibling = oldChild.get('treeNodePreviousSibling');

    if (treeNodeNextSibling) {
      treeNodeNextSibling.set('treeNodePreviousSibling', treeNodePreviousSibling);
    }
    if (treeNodePreviousSibling) {
      treeNodePreviousSibling.set('treeNodeNextSibling', treeNodeNextSibling);
    }

    if (oldChild === this.get('treeNodeFirstChild')) {
      this.set('treeNodeFirstChild', treeNodeNextSibling);
    }
    if (oldChild === this.get('treeNodeLastChild')) {
      this.set('treeNodeLastChild', treeNodePreviousSibling);
    }

    oldChild.set('treeNodeParent', null);
    oldChild.set('treeNodePreviousSibling', null);
    oldChild.set('treeNodeNextSibling', null);
  },

  treeNodeTraverse(callback, thisArg) {
    for (let node = this.get('treeNodeFirstChild'); node !== null; node = node.get('treeNodeNextSibling')) {
      callback.call(thisArg, node);
      node.treeNodeTraverse(callback, thisArg);
    }
  }
});
