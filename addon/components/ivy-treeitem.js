import Component from 'ember-component';
import computed, { notEmpty, oneWay } from 'ember-computed';
import layout from '../templates/components/ivy-treeitem';
import { insertBefore, remove } from '../-private/nodes';

export default Component.extend({
  activate() {
    this.get('tree').activate(this);
    this.sendAction('onSelect');
  },

  active: computed('activeClass', 'isActive', function() {
    return this.get('isActive') ? this.get('activeClass') : null;
  }).readOnly(),

  activeClass: 'active',

  ariaExpanded: computed('hasChildren', 'isExpanded', function() {
    return this.get('hasChildren') ? this.get('isExpanded') + '' : null;
  }).readOnly(),

  ariaHidden: computed('parent.isExpanded', 'tree', function() {
    const parent = this.get('parent');
    return (parent !== this.get('tree') && !parent.get('isExpanded')) + '';
  }).readOnly(),

  ariaLevel: computed('parent.ariaLevel', function() {
    return this.getWithDefault('parent.ariaLevel', 0) + 1;
  }).readOnly(),

  ariaRole: 'treeitem',

  ariaSelected: computed('isActive', function() {
    return this.get('isActive') + '';
  }).readOnly(),

  attributeBindings: [
    'ariaExpanded:aria-expanded',
    'ariaHidden:aria-hidden',
    'ariaLevel:aria-level',
    'ariaSelected:aria-selected'
  ],

  classNameBindings: ['active'],

  click(event) {
    this.activate();
    event.preventDefault();
    event.stopPropagation();
  },

  collapse() {
    if (!this.get('isExpanded')) {
      return;
    }

    this.set('_isExpanded', false);
    this.sendAction('onToggle', false);
  },


  doubleClick(event) {
    this.toggleExpanded();
    event.preventDefault();
    event.stopPropagation();
  },

  expand() {
    if (this.get('isExpanded')) {
      return;
    }

    this.set('_isExpanded', true);
    this.sendAction('onToggle', true);
  },

  firstChild: null,

  hasChildren: notEmpty('firstChild'),

  init() {
    this._super(...arguments);

    const parent = this.get('parent');

    if (parent) {
      insertBefore(parent, this, this.get('nextSibling'));
    }
  },

  isActive: computed('tree.activeDescendant', function() {
    return this.get('tree.activeDescendant') === this;
  }).readOnly(),

  _isExpanded: false,

  isExpanded: oneWay('_isExpanded'),

  layout,

  nextSibling: null,

  previousSibling: null,

  tagName: 'li',

  toggleExpanded() {
    if (this.get('isExpanded')) {
      this.collapse();
    } else {
      this.expand();
    }
  },

  willDestroy() {
    this._super(...arguments);
    remove(this);
  }
});
