import Ember from 'ember';
import layout from '../templates/components/ivy-tree';

export default Ember.Component.extend({
  layout,

  tagName: 'ul',
  attributeBindings: ['ariaActiveDescendant:aria-activedescendant', 'tabindex'],

  activeClass: 'active',

  ariaActiveDescendant: Ember.computed.readOnly('activeItem.elementId'),

  ariaRole: Ember.computed('isRootGroup', function() {
    return this.get('isRootGroup') ? 'tree' : 'group';
  }).readOnly(),

  groups: Ember.computed(function() {
    return Ember.A();
  }).readOnly(),

  isRootGroup: Ember.computed.none('parentGroup'),

  items: Ember.computed(function() {
    return Ember.A();
  }).readOnly(),

  rootGroup: Ember.computed('parentGroup.rootGroup', function() {
    return this.getWithDefault('parentGroup.rootGroup', this);
  }).readOnly(),

  tabindex: Ember.computed('isRootGroup', function() {
    if (this.get('isRootGroup')) { return 0; }
  }).readOnly(),

  activateItem(item) {
    this.set('activeItem', item);
  },

  addGroup(group) {
    this.get('groups').addObject(group);
  },

  addItem(item) {
    this.get('items').addObject(item);
  },

  expandAll() {
    this.get('items').invoke('expand');
    this.get('groups').invoke('expandAll');
  },

  handleAsteriskKey(event) {
    this.expandAll();

    event.preventDefault();
    event.stopPropagation();
  },

  handleDownArrowKey(event) {
    const activeItem = this.get('activeItem');

    if (activeItem) {
      if (activeItem.get('hasChildren') && activeItem.get('isExpanded')) {
        activeItem.get('firstChild').activate();
      } else {
        let nextSibling = activeItem.get('nextSibling');
        let parentItem = activeItem.get('parentItem');

        while (!nextSibling && parentItem) {
          nextSibling = parentItem.get('nextSibling');
          parentItem = parentItem.get('parentItem');
        }

        if (nextSibling) {
          nextSibling.activate();
        }
      }

      event.preventDefault();
      event.stopPropagation();
    }
  },

  handleEnterKey(event) {
    const activeItem = this.get('activeItem');

    if (activeItem) {
      activeItem.toggleExpanded();
      event.preventDefault();
      event.stopPropagation();
    }
  },

  handleLeftArrowKey(event) {
    const activeItem = this.get('activeItem');

    if (activeItem) {
      if (activeItem.get('hasChildren') && activeItem.get('isExpanded')) {
        activeItem.collapse();
      } else {
        const parentItem = activeItem.get('parentItem');

        if (parentItem) {
          parentItem.activate();
        }
      }

      event.preventDefault();
      event.stopPropagation();
    }
  },

  handleRightArrowKey(event) {
    const activeItem = this.get('activeItem');

    if (activeItem) {
      if (activeItem.get('hasChildren')) {
        activeItem.expand();

        const firstChild = activeItem.get('firstChild');

        if (firstChild) {
          firstChild.activate();
        }

        event.preventDefault();
        event.stopPropagation();
      }
    }
  },

  handleUpArrowKey(event) {
    const activeItem = this.get('activeItem');

    if (activeItem) {
      let previousItem = activeItem.get('previousSibling');

      while (previousItem && previousItem.get('hasChildren') && previousItem.get('isExpanded')) {
        previousItem = previousItem.get('lastChild');
      }

      if (!previousItem) {
        previousItem = activeItem.get('parentItem');
      }

      if (previousItem) {
        previousItem.activate();
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },

  init() {
    this._super(...arguments);

    const parentGroup = this.get('parentGroup');

    if (parentGroup) {
      parentGroup.addGroup(this);
    }
  },

  keyDown(event) {
    if (this.get('isRootGroup')) {
      switch (event.keyCode) {
        case 13:
          this.handleEnterKey(event);
          break;
        case 37:
          this.handleLeftArrowKey(event);
          break;
        case 38:
          this.handleUpArrowKey(event);
          break;
        case 39:
          this.handleRightArrowKey(event);
          break;
        case 40:
          this.handleDownArrowKey(event);
          break;
        case 56:
          if (event.shiftKey) {
            this.handleAsteriskKey(event);
          }
          break;
      }
    }
  },

  removeGroup(group) {
    this.get('groups').removeObject(group);
  },

  removeItem(item) {
    this.get('items').removeObject(item);
  },

  willDestroy() {
    this._super(...arguments);

    const parentGroup = this.get('parentGroup');

    if (parentGroup) {
      parentGroup.removeGroup(this);
    }
  }
});
