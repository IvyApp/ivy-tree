import Ember from 'ember';
import layout from '../templates/components/ivy-treeitem';

export default Ember.Component.extend({
  layout,

  tagName: 'li',
  attributeBindings: ['ariaExpanded:aria-expanded', 'ariaHidden:aria-hidden', 'ariaLevel:aria-level', 'ariaSelected:aria-selected'],
  classNameBindings: ['active'],

  active: Ember.computed('activeClass', 'isActive', function() {
    return this.get('isActive') && this.get('activeClass');
  }).readOnly(),

  activeClass: 'active',

  ariaExpanded: Ember.computed('isExpanded', function() {
    return this.get('isExpanded') + '';
  }).readOnly(),

  ariaHidden: Ember.computed('parentItem.isHidden', function() {
    return !!this.get('parentItem.isHidden') + '';
  }).readOnly(),

  ariaLevel: Ember.computed('parentItem.ariaLevel', function() {
    return this.getWithDefault('parentItem.ariaLevel', 0) + 1;
  }).readOnly(),

  ariaRole: 'treeitem',

  ariaSelected: Ember.computed('isActive', function() {
    return this.get('isActive') + '';
  }).readOnly(),

  firstChild: Ember.computed.readOnly('items.firstObject'),

  hasChildren: Ember.computed.notEmpty('items'),

  isActive: Ember.computed('rootGroup.activeItem', function() {
    return this.get('rootGroup.activeItem') === this;
  }).readOnly(),

  isExpanded: false,

  isHidden: Ember.computed.not('isExpanded'),

  items: Ember.computed(function() {
    return Ember.A();
  }).readOnly(),

  lastChild: Ember.computed.readOnly('items.lastObject'),

  nextSibling: Ember.computed('parentGroup.items.[]', function() {
    const items = this.get('parentGroup.items');
    const index = items.indexOf(this);

    if (index < items.get('length') - 1) {
      return items.objectAt(index + 1);
    }
  }).readOnly(),

  previousSibling: Ember.computed('parentGroup.items.[]', function() {
    const items = this.get('parentGroup.items');
    const index = items.indexOf(this);

    if (index > 0) {
      return items.objectAt(index - 1);
    }
  }).readOnly(),

  rootGroup: Ember.computed.readOnly('parentGroup.rootGroup'),

  activate() {
    this.get('rootGroup').activateItem(this);
  },

  addItem(item) {
    this.get('items').addObject(item);
  },

  click(event) {
    this.activate();

    event.preventDefault();
    event.stopPropagation();
  },

  collapse() {
    this.set('isExpanded', false);
  },

  doubleClick(event) {
    this.toggleExpanded();

    event.preventDefault();
    event.stopPropagation();
  },

  expand() {
    this.set('isExpanded', true);
  },

  init() {
    this._super(...arguments);

    const parentItem = this.get('parentItem');

    if (parentItem) {
      parentItem.addItem(this);
    }

    this.get('parentGroup').addItem(this);
  },

  removeItem(item) {
    this.get('items').removeObject(item);
  },

  toggleExpanded() {
    if (this.get('isExpanded')) {
      this.collapse();
    } else {
      this.expand();
    }
  },

  willDestroy() {
    this._super(...arguments);

    const parentItem = this.get('parentItem');

    if (parentItem) {
      parentItem.removeItem(this);
    }

    this.get('parentGroup').removeItem(this);
  }
});
