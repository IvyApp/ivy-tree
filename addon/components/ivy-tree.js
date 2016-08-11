import Component from 'ember-component';
import layout from '../templates/components/ivy-tree';
import { readOnly } from 'ember-computed';

function traverse(node, callback, thisArg) {
  let child = node.get('firstChild');

  while (child) {
    callback.call(thisArg, child);
    traverse(child, callback, thisArg);
    child = child.get('nextSibling');
  }
}

export default Component.extend({
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
    traverse(this, function(node) {
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

    if (!activeDescendant) {
      return;
    }

    if (activeDescendant.get('hasChildren') && activeDescendant.get('isExpanded')) {
      activeDescendant.get('firstChild').activate();
      event.preventDefault();
      event.stopPropagation();
    } else {
      let node = null;
      let parent = activeDescendant;

      while (!node && parent) {
        node = parent.get('nextSibling');
        parent = parent.get('parent');
      }

      if (node) {
        node.activate();
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },

  moveEnd(event) {
    let node = this.get('lastChild');

    while (node && node.get('hasChildren') && node.get('isExpanded')) {
      node = node.get('lastChild');
    }

    if (node) {
      node.activate();
    }

    event.preventDefault();
    event.stopPropagation();
  },

  moveHome(event) {
    const node = this.get('firstChild');

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

    if (activeDescendant.get('hasChildren') && activeDescendant.get('isExpanded')) {
      activeDescendant.collapse();
    } else {
      const parent = activeDescendant.get('parent');

      if (parent && parent !== this) {
        parent.activate();
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

    if (activeDescendant.get('hasChildren')) {
      activeDescendant.expand();

      const node = activeDescendant.get('firstChild');

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

    let node = activeDescendant.get('previousSibling');

    while (node && node.get('hasChildren') && node.get('isExpanded')) {
      node = node.get('lastChild');
    }

    if (!node) {
      node = activeDescendant.get('parent');
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
