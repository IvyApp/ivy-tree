import EmberObject from 'ember-object';
import EmberArray from 'ember-array';
import Mixin from 'ember-metal/mixin';
import { A } from 'ember-array/utils';
import computed, { bool } from 'ember-computed';

function appendChild(parentNode, newChild) {
  const lastChild = parentNode.get('lastChild');

  if (lastChild) {
    insertAfter(newChild, lastChild);
  } else {
    newChild.set('parentNode', parentNode);
    parentNode.set('firstChild', newChild);
    parentNode.set('lastChild', newChild);
  }

  return newChild;
}

function insertAfter(newChild, refChild) {
  const nextSibling = refChild.get('nextSibling');

  if (nextSibling) {
    nextSibling.set('previousSibling', newChild);
  }

  const parentNode = refChild.get('parentNode');

  if (parentNode && parentNode.get('lastChild') === refChild) {
    parentNode.set('lastChild', newChild);
  }

  newChild.set('parentNode', parentNode);
  newChild.set('previousSibling', refChild);
  newChild.set('nextSibling', nextSibling);
  refChild.set('nextSibling', newChild);

  return newChild;
}

function insertBefore(newChild, refChild) {
  const previousSibling = refChild.get('previousSibling');

  if (previousSibling) {
    previousSibling.set('nextSibling', newChild);
  }

  const parentNode = refChild.get('parentNode');

  if (parentNode && parentNode.get('firstChild') === refChild) {
    parentNode.set('firstChild', newChild);
  }

  newChild.set('parentNode', parentNode);
  newChild.set('previousSibling', previousSibling);
  newChild.set('nextSibling', refChild);
  refChild.set('previousSibling', newChild);

  return newChild;
}

function remove(oldChild) {
  const nextSibling = oldChild.get('nextSibling');
  const previousSibling = oldChild.get('previousSibling');

  if (nextSibling) {
    nextSibling.set('previousSibling', previousSibling);
  }
  if (previousSibling) {
    previousSibling.set('nextSibling', nextSibling);
  }

  const parentNode = oldChild.get('parentNode');

  if (parentNode) {
    if (parentNode.get('firstChild') === oldChild) {
      parentNode.set('firstChild', nextSibling);
    }
    if (parentNode.get('lastChild') === oldChild) {
      parentNode.set('lastChild', previousSibling);
    }
  }

  oldChild.set('parentNode', null);
  oldChild.set('previousSibling', null);
  oldChild.set('nextSibling', null);

  return oldChild;
}

const TreeNodeList = EmberObject.extend(EmberArray, {
  headNode: null,

  objectAt(idx) {
    let currentNode;

    for (let i = 0; i <= idx; i++) {
      currentNode = this.nextObject(i, currentNode);

      if (!currentNode) {
        break;
      }
    }

    if (currentNode) {
      return currentNode;
    } else {
      return undefined;
    }
  }
});

const AncestorList = TreeNodeList.extend({
  length: computed('headNode.ancestors.length', function() {
    const headNode = this.get('headNode');

    if (!headNode) {
      return 0;
    }

    return headNode.get('ancestors.length') + 1;
  }).readOnly(),

  nextObject(idx, previousObject) {
    if (idx === 0) {
      return this.get('headNode');
    } else {
      return previousObject.get('parentNode');
    }
  }
});

const NextSiblingList = TreeNodeList.extend({
  length: computed('headNode.nextSiblings.length', function() {
    const headNode = this.get('headNode');

    if (!headNode) {
      return 0;
    }

    return headNode.get('nextSiblings.length') + 1;
  }).readOnly(),

  nextObject(idx, previousObject) {
    if (idx === 0) {
      return this.get('headNode');
    } else {
      return previousObject.get('nextSibling');
    }
  }
});

const TreeNodeMixin = Mixin.create({
  ancestors: computed('parentNode', function() {
    return AncestorList.create({ headNode: this.get('parentNode') });
  }).readOnly(),

  childNodes: computed('firstChild', function() {
    return NextSiblingList.create({ headNode: this.get('firstChild') });
  }).readOnly(),

  descendants: computed('childNodes.@each.selfAndDescendants', function() {
    return this.get('childNodes').reduce(function(descendants, childNode) {
      return descendants.pushObjects(childNode.get('selfAndDescendants'));
    }, A());
  }).readOnly(),

  firstChild: null,

  hasChildNodes: bool('firstChild'),

  index: computed('parentNode.childNodes.[]', function() {
    const parentNode = this.get('parentNode');

    if (parentNode) {
      return parentNode.get('childNodes').indexOf(this);
    } else {
      return -1;
    }
  }).readOnly(),

  lastChild: null,

  nextSibling: null,

  nextSiblings: computed('nextSibling', function() {
    return NextSiblingList.create({ headNode: this.get('nextSibling') });
  }).readOnly(),

  parentNode: null,

  previousSibling: null,

  selfAndAncestors: computed('ancestors', function() {
    return AncestorList.create({ headNode: this });
  }).readOnly(),

  selfAndDescendants: computed('descendants', function() {
    return A([this]).pushObjects(this.get('descendants'));
  }).readOnly(),

  selfAndNextSiblings: computed(function() {
    return NextSiblingList.create({ headNode: this });
  }).readOnly(),

  appendChild(newChild) {
    return this.insertBefore(newChild, null);
  },

  before(newChild) {
    const parentNode = this.get('parentNode');

    if (parentNode) {
      parentNode.insertBefore(newChild, this);
    }

    return this;
  },

  insertBefore(newChild, refChild) {
    if (!TreeNodeMixin.detect(newChild)) {
      throw new Error('The provided node must implement TreeNodeMixin');
    }

    if (this.get('ancestors').includes(newChild)) {
      throw new Error('The provided node is already an ancestor of this node');
    }

    if (refChild !== newChild) {
      newChild.remove();

      if (refChild === null) {
        appendChild(this, newChild);
      } else {
        if (refChild.get('parentNode') !== this) {
          throw new Error('The reference node is not a child of this node');
        }

        insertBefore(newChild, refChild);
      }
    }

    return newChild;
  },

  remove() {
    const parentNode = this.get('parentNode');

    if (parentNode) {
      parentNode.removeChild(this);
    }

    return this;
  },

  removeChild(oldChild) {
    if (oldChild.get('parentNode') !== this) {
      throw new Error('The provided node is not a child of this node');
    }

    remove(oldChild);

    return oldChild;
  },

  replaceChild(newChild, oldChild) {
    this.insertBefore(newChild, oldChild);
    return this.removeChild(oldChild);
  },

  replaceWith(newContent) {
    const parentNode = this.get('parentNode');

    if (parentNode) {
      parentNode.replaceChild(newContent, this);
    }

    return this;
  },

  traverse(callback, thisArg) {
    for (let node = this.get('firstChild'); node !== null; node = node.get('nextSibling')) {
      callback.call(thisArg, node);
      node.traverse(callback, thisArg);
    }
  },

  wrap(wrappingNode) {
    this.before(wrappingNode);
    wrappingNode.appendChild(this);
    return this;
  }
});

export default TreeNodeMixin;
