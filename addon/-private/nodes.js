export function appendChild(parent, newChild) {
  const lastChild = parent.get('lastChild');

  if (lastChild) {
    insertAfter(newChild, lastChild);
  } else {
    newChild.set('parent', parent);
    parent.set('firstChild', newChild);
    parent.set('lastChild', newChild);
  }

  return newChild;
}

export function insertAfter(newChild, refChild) {
  const nextSibling = refChild.get('nextSibling');

  if (nextSibling) {
    nextSibling.set('previousSibling', newChild);
  }

  const parent = refChild.get('parent');

  if (parent && parent.get('lastChild') === refChild) {
    parent.set('lastChild', newChild);
  }

  newChild.set('parent', parent);
  newChild.set('previousSibling', refChild);
  newChild.set('nextSibling', nextSibling);
  refChild.set('nextSibling', newChild);

  return newChild;
}

export function insertBefore(newChild, refChild) {
  if (refChild === newChild) {
    return;
  }

  const previousSibling = refChild.get('previousSibling');

  if (previousSibling) {
    previousSibling.set('nextSibling', newChild);
  }

  const parent = refChild.get('parent');

  if (parent && parent.get('firstChild') === refChild) {
    parent.set('firstChild', newChild);
  }

  newChild.set('parent', parent);
  newChild.set('previousSibling', previousSibling);
  newChild.set('nextSibling', refChild);
  refChild.set('previousSibling', newChild);

  return newChild;
}

export function remove(oldChild) {
  const nextSibling = oldChild.get('nextSibling');
  const previousSibling = oldChild.get('previousSibling');

  if (nextSibling) {
    nextSibling.set('previousSibling', previousSibling);
  }
  if (previousSibling) {
    previousSibling.set('nextSibling', nextSibling);
  }

  const parent = oldChild.get('parent');

  if (parent) {
    if (parent.get('firstChild') === oldChild) {
      parent.set('firstChild', nextSibling);
    }
    if (parent.get('lastChild') === oldChild) {
      parent.set('lastChild', previousSibling);
    }
  }

  oldChild.set('parent', null);
  oldChild.set('previousSibling', null);
  oldChild.set('nextSibling', null);

  return oldChild;
}
