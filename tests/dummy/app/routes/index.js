import Route from 'ember-route';
import { buildTree } from 'ivy-tree';

export default Route.extend({
  model() {
    return buildTree([
      { id: 'fruits',           label: 'Fruits',           parent: null           },
      { id: 'oranges',          label: 'Oranges',          parent: 'fruits'       },
      { id: 'pineapples',       label: 'Pineapples',       parent: 'fruits'       },
      { id: 'apples',           label: 'Apples',           parent: 'fruits'       },
      { id: 'macintosh',        label: 'Macintosh',        parent: 'apples'       },
      { id: 'granny-smith',     label: 'Granny Smith',     parent: 'apples'       },
      { id: 'washington-state', label: 'Washington State', parent: 'granny-smith' },
      { id: 'michigan',         label: 'Michigan',         parent: 'granny-smith' },
      { id: 'new-york',         label: 'New York',         parent: 'granny-smith' },
      { id: 'fuji',             label: 'Fuji',             parent: 'apples'       },
      { id: 'bananas',          label: 'Bananas',          parent: 'fruits'       },
      { id: 'pears',            label: 'Pears',            parent: 'fruits'       },
      { id: 'vegetables',       label: 'Vegetables',       parent: null           },
      { id: 'broccoli',         label: 'Broccoli',         parent: 'vegetables'   },
      { id: 'carrots',          label: 'Carrots',          parent: 'vegetables'   },
      { id: 'lettuce',          label: 'Lettuce',          parent: 'vegetables'   },
      { id: 'romaine',          label: 'Romaine',          parent: 'lettuce'      },
      { id: 'iceberg',          label: 'Iceberg',          parent: 'lettuce'      },
      { id: 'butterhead',       label: 'Butterhead',       parent: 'lettuce'      },
      { id: 'spinach',          label: 'Spinach',          parent: 'vegetables'   },
      { id: 'squash',           label: 'Squash',           parent: 'vegetables'   },
      { id: 'acorn',            label: 'Acorn',            parent: 'squash'       },
      { id: 'ambercup',         label: 'Ambercup',         parent: 'squash'       },
      { id: 'autumn-cup',       label: 'Autumn Cup',       parent: 'squash'       },
      { id: 'hubbard',          label: 'Hubbard',          parent: 'squash'       },
      { id: 'kabocha',          label: 'Kabocha',          parent: 'squash'       },
      { id: 'butternut',        label: 'Butternut',        parent: 'squash'       },
      { id: 'spaghetti',        label: 'Spaghetti',        parent: 'squash'       },
      { id: 'sweet-dumpling',   label: 'Sweet Dumpling',   parent: 'squash'       },
      { id: 'turban',           label: 'Turban',           parent: 'squash'       }
    ]);
  }
});
