import Component from 'ember-component';
import layout from '../templates/components/ivy-tree-group';
import { bool } from 'ember-computed';

export default Component.extend({
  ariaRole: 'group',

  isVisible: bool('isExpanded'),

  layout,

  tagName: 'ul'
});
