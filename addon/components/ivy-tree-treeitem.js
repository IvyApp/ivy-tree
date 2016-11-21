import Component from 'ember-component';
import layout from '../templates/components/ivy-tree-treeitem';
import computed, { readOnly } from 'ember-computed';

export default Component.extend({
  active: computed('activeClass', 'activeNode', 'node', function() {
    return this.get('activeNode') === this.get('node') ? this.get('activeClass') : false;
  }).readOnly(),

  activeClass: 'active',

  ariaExpanded: computed('node.expanded', 'node.hasChildNodes', function() {
    const node = this.get('node');

    if (!node.get('hasChildNodes')) {
      return;
    }

    return node.get('expanded') + '';
  }).readOnly(),

  ariaHidden: computed('node.parentNode.expanded', function() {
    const parentNode = this.get('node.parentNode');

    if (parentNode) {
      return !parentNode.get('expanded') + '';
    } else {
      return 'false';
    }
  }).readOnly(),

  ariaLabel: readOnly('node.label'),

  ariaLevel: readOnly('node.depth'),

  ariaRole: 'treeitem',

  ariaSelected: computed('activeNode', 'node', function() {
    return (this.get('activeNode') === this.get('node')) + '';
  }).readOnly(),

  attributeBindings: [
    'ariaExpanded:aria-expanded',
    'ariaHidden:aria-hidden',
    'ariaLabel:aria-label',
    'ariaLevel:aria-level',
    'ariaSelected:aria-selected'
  ],

  classNameBindings: [
    'active'
  ],

  click(event) {
    this.sendAction('activate', this.get('node'));
    event.preventDefault();
    event.stopPropagation();
  },

  doubleClick(event) {
    const node = this.get('node');

    this.sendAction('expand', !node.get('expanded'), node);
    event.preventDefault();
    event.stopPropagation();
  },

  init() {
    this._super(...arguments);
    this.get('tree').registerTreeItem(this);
  },

  layout,

  tagName: 'li',

  willDestroy() {
    this._super(...arguments);
    this.get('tree').unregisterTreeItem(this);
  }
});
