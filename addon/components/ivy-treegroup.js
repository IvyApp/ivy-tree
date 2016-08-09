import Component from 'ember-component';
import layout from '../templates/components/ivy-treegroup';

export default Component.extend({
  ariaRole: 'group',

  layout,

  tagName: 'ul'
});
