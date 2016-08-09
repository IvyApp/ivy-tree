import Component from 'ember-component';
import computed, { notEmpty } from 'ember-computed';
import layout from '../templates/components/ivy-treeitem';
import { appendChild, remove } from '../-private/nodes';

export default Component.extend({
  activate() {
    this.get('tree').activate(this);
  },

  active: computed('activeClass', 'isActive', function() {
    return this.get('isActive') ? this.get('activeClass') : null;
  }).readOnly(),

  activeClass: 'active',

  ariaExpanded: computed('isExpanded', function() {
    return this.get('isExpanded') + '';
  }).readOnly(),

  ariaHidden: computed('parent.isExpanded', function() {
    return !this.get('parent.isExpanded') + '';
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
    this.set('isExpanded', false);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    const parent = this.get('parent');

    if (parent) {
      appendChild(parent, this);
    }
  },

  doubleClick(event) {
    this.toggleExpanded();
    event.preventDefault();
    event.stopPropagation();
  },

  expand() {
    this.set('isExpanded', true);
  },

  firstChild: null,

  hasChildren: notEmpty('firstChild'),

  isActive: computed('tree.activeDescendant', function() {
    return this.get('tree.activeDescendant') === this;
  }).readOnly(),

  isExpanded: false,

  layout,

  nextSibling: null,

  previousSibling: null,

  toggleExpanded() {
    this.toggleProperty('isExpanded');
  },

  willDestroy() {
    this._super(...arguments);
    remove(this);
  }
});
