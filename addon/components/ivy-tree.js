import Component from 'ember-component';
import TreeNode from '../tree-node';
import computed, { readOnly } from 'ember-computed';
import layout from '../templates/components/ivy-tree';

export default Component.extend({
  actions: {
    expand(expanded, node) {
      if (expanded) {
        this.expandNode(node);
      } else {
        this.collapseNode(node);
      }
    }
  },

  activateNode(node) {
    this.sendAction('activate', node);
  },

  activeDescendant: computed('activeNode', function() {
    const activeNode = this.get('activeNode');

    if (!activeNode) {
      return;
    }

    // If activeNode is a TreeNode, grab its ID. Otherwise we assume
    // activeNode was given as an ID already.
    const id = TreeNode.detectInstance(activeNode) ? activeNode.get('id') : activeNode;

    return this._idToItem[id];
  }).readOnly(),

  ariaActiveDescendant: readOnly('activeDescendant.elementId'),

  ariaRole: 'tree',

  attributeBindings: [
    'ariaActiveDescendant:aria-activedescendant',
    'tabindex'
  ],

  collapseNode(node) {
    node.set('expanded', false);
  },

  expandAll() {
    this.get('node').traverse(this.expandNode, this);
  },

  expandNode(node) {
    node.set('expanded', true);
  },

  groupComponent: 'ivy-tree-group',

  init() {
    this._super(...arguments);
    this._idToItem = {};
    this._idToNode = {};
  },

  keyDown(event) {
    switch (event.keyCode) {
    case 13: this.toggleExpanded(event); break;
    case 35: this.moveEnd(event);        break;
    case 36: this.moveHome(event);       break;
    case 37: this.moveLeft(event);       break;
    case 38: this.moveUp(event);         break;
    case 39: this.moveRight(event);      break;
    case 40: this.moveDown(event);       break;
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
    const activeNode = this.get('activeNode');

    if (activeNode) {
      const firstChild = activeNode.get('firstChild');

      if (firstChild && activeNode.get('expanded')) {
        this.activateNode(firstChild);
        event.preventDefault();
        event.stopPropagation();
      } else {
        let node = null;
        let parentNode = activeNode;

        while (!node && parentNode) {
          node = parentNode.get('nextSibling');
          parentNode = parentNode.get('parentNode');
        }

        if (node) {
          this.activateNode(node);
          event.preventDefault();
          event.stopPropagation();
        }
      }
    } else {
      const firstChild = this.get('node.firstChild');

      if (firstChild) {
        this.activateNode(firstChild);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },

  moveEnd(event) {
    let node = this.get('node.lastChild');

    while (node && node.get('hasChildren') && node.get('expanded')) {
      node = node.get('lastChild');
    }

    if (node) {
      this.activateNode(node);
    }

    event.preventDefault();
    event.stopPropagation();
  },

  moveHome(event) {
    const node = this.get('node.firstChild');

    if (!node) {
      return;
    }

    this.activateNode(node);
    event.preventDefault();
    event.stopPropagation();
  },

  moveLeft(event) {
    const activeNode = this.get('activeNode');

    if (!activeNode) {
      return;
    }

    if (activeNode.get('hasChildNodes') && activeNode.get('expanded')) {
      this.collapseNode(activeNode);
    } else {
      const parentNode = activeNode.get('parentNode');

      if (parentNode && parentNode !== this.get('node')) {
        this.activateNode(parentNode);
      }
    }

    event.preventDefault();
    event.stopPropagation();
  },

  moveRight(event) {
    const activeNode = this.get('activeNode');

    if (!activeNode) {
      return;
    }

    const firstChild = activeNode.get('firstChild');

    if (firstChild) {
      this.expandNode(activeNode);
      this.activateNode(firstChild);
      event.preventDefault();
      event.stopPropagation();
    }
  },

  moveUp(event) {
    const activeNode = this.get('activeNode');

    if (!activeNode) {
      return;
    }

    let node = activeNode.get('previousSibling');

    while (node && node.get('hasChildNodes') && node.get('expanded')) {
      node = node.get('lastChild');
    }

    if (!node) {
      node = activeNode.get('parentNode');
    }

    if (node && node !== this.get('node')) {
      this.activateNode(node);
      event.preventDefault();
      event.stopPropagation();
    }
  },

  node: computed('model', function() {
    return TreeNode.build(this.get('model'));
  }).readOnly(),

  registerTreeItem(item) {
    const node = item.get('node');

    if (!node) {
      return;
    }

    const id = node.get('id');

    this._idToItem[id] = item;
    this._idToNode[id] = node;
  },

  tabindex: 0,

  tagName: 'ul',

  toggleExpanded(event) {
    const activeNode = this.get('activeNode');

    if (!activeNode) {
      return;
    }

    this.toggleNode(activeNode);
    event.preventDefault();
    event.stopPropagation();
  },

  toggleNode(node) {
    if (node.get('expanded')) {
      this.collapseNode(node);
    } else {
      this.expandNode(node);
    }
  },

  treeitemComponent: 'ivy-tree-treeitem',

  unregisterTreeItem(item) {
    const node = item.get('node');

    if (!node) {
      return;
    }

    const id = node.get('id');

    delete this._idToItem[id];
    delete this._idToNode[id];
  }
});
