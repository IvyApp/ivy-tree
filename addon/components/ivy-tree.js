import Component from 'ember-component';
import TreeNodeMixin from '../mixins/tree-node';
import layout from '../templates/components/ivy-tree';
import { readOnly } from 'ember-computed';

export default Component.extend(TreeNodeMixin, {
  activate(treeitem) {
    this.set('activeDescendant', treeitem);
  },

  ariaActiveDescendant: readOnly('activeDescendant.elementId'),

  ariaRole: 'tree',

  attributeBindings: [
    'ariaActiveDescendant:aria-activedescendant',
    'tabindex'
  ],

  expandAll() {
    this.treeNodeTraverse(function(node) {
      node.expand();
    });
  },

  keyDown(event) {
    switch (event.keyCode) {
      case 13:
        this.toggleExpanded(event);
        break;
      case 35:
        this.moveEnd(event);
        break;
      case 36:
        this.moveHome(event);
        break;
      case 37:
        this.moveLeft(event);
        break;
      case 38:
        this.moveUp(event);
        break;
      case 39:
        this.moveRight(event);
        break;
      case 40:
        this.moveDown(event);
        break;
      case 56:
        if (event.shiftKey) {
          this.expandAll();
          event.preventDefault();
          event.stopPropagation();
        }
        break;
    }
  },

  layout,

  moveDown(event) {
    const activeDescendant = this.get('activeDescendant');

    if (activeDescendant) {
      if (activeDescendant.get('treeNodeHasChildren') && activeDescendant.get('isExpanded')) {
        activeDescendant.get('treeNodeFirstChild').activate();
        event.preventDefault();
        event.stopPropagation();
      } else {
        let node = null;
        let treeNodeParent = activeDescendant;

        while (!node && treeNodeParent) {
          node = treeNodeParent.get('treeNodeNextSibling');
          treeNodeParent = treeNodeParent.get('treeNodeParent');
        }

        if (node) {
          node.activate();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    } else {
      const treeNodeFirstChild = this.get('treeNodeFirstChild');

      if (treeNodeFirstChild) {
        treeNodeFirstChild.activate();
        event.preventDefault();
        event.stopPropagation();
      }

      return;
    }
  },

  moveEnd(event) {
    let node = this.get('treeNodeLastChild');

    while (node && node.get('treeNodeHasChildren') && node.get('isExpanded')) {
      node = node.get('treeNodeLastChild');
    }

    if (node) {
      node.activate();
    }

    event.preventDefault();
    event.stopPropagation();
  },

  moveHome(event) {
    const node = this.get('treeNodeFirstChild');

    if (!node) {
      return;
    }

    node.activate();
    event.preventDefault();
    event.stopPropagation();
  },

  moveLeft(event) {
    const activeDescendant = this.get('activeDescendant');

    if (!activeDescendant) {
      return;
    }

    if (activeDescendant.get('treeNodeHasChildren') && activeDescendant.get('isExpanded')) {
      activeDescendant.collapse();
    } else {
      const treeNodeParent = activeDescendant.get('treeNodeParent');

      if (treeNodeParent && treeNodeParent !== this) {
        treeNodeParent.activate();
      }
    }

    event.preventDefault();
    event.stopPropagation();
  },

  moveRight(event) {
    const activeDescendant = this.get('activeDescendant');

    if (!activeDescendant) {
      return;
    }

    if (activeDescendant.get('treeNodeHasChildren')) {
      activeDescendant.expand();

      const node = activeDescendant.get('treeNodeFirstChild');

      if (node) {
        node.activate();
      }

      event.preventDefault();
      event.stopPropagation();
    }
  },

  moveUp(event) {
    const activeDescendant = this.get('activeDescendant');

    if (!activeDescendant) {
      return;
    }

    let node = activeDescendant.get('treeNodePreviousSibling');

    while (node && node.get('treeNodeHasChildren') && node.get('isExpanded')) {
      node = node.get('treeNodeLastChild');
    }

    if (!node) {
      node = activeDescendant.get('treeNodeParent');
    }

    if (node && node !== this) {
      node.activate();
      event.preventDefault();
      event.stopPropagation();
    }
  },

  tabindex: 0,

  tagName: 'ul',

  toggleExpanded(event) {
    const activeDescendant = this.get('activeDescendant');

    if (!activeDescendant) {
      return;
    }

    activeDescendant.toggleExpanded();
    event.preventDefault();
    event.stopPropagation();
  }
});
