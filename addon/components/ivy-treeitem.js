import Component from 'ember-component';
import TreeNodeMixin from '../mixins/tree-node';
import computed, { oneWay } from 'ember-computed';
import layout from '../templates/components/ivy-treeitem';

export default Component.extend(TreeNodeMixin, {
  activate() {
    this.get('tree').activate(this);
    this.sendAction('onSelect');
  },

  active: computed('activeClass', 'isActive', function() {
    return this.get('isActive') ? this.get('activeClass') : null;
  }).readOnly(),

  activeClass: 'active',

  ariaExpanded: computed('isExpanded', 'treeNodeHasChildren', function() {
    return this.get('treeNodeHasChildren') ? this.get('isExpanded') + '' : null;
  }).readOnly(),

  ariaHidden: computed('treeNodeParent.isExpanded', 'tree', function() {
    const treeNodeParent = this.get('treeNodeParent');
    return (treeNodeParent !== this.get('tree') && !treeNodeParent.get('isExpanded')) + '';
  }).readOnly(),

  ariaLevel: computed('treeNodeParent.ariaLevel', function() {
    return this.getWithDefault('treeNodeParent.ariaLevel', 0) + 1;
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

  init() {
    this._super(...arguments);
    this.treeNodeAttach();
  },

  isActive: computed('tree.activeDescendant', function() {
    return this.get('tree.activeDescendant') === this;
  }).readOnly(),

  _isExpanded: false,

  isExpanded: oneWay('_isExpanded'),

  layout,

  tagName: 'li',

  toggleExpanded() {
    if (this.get('isExpanded')) {
      this.collapse();
    } else {
      this.expand();
    }
  },

  willDestroy() {
    this.treeNodeDetach();
    this._super(...arguments);
  }
});
