import Route from 'ember-route';

export default Route.extend({
  model() {
    return {
      name: 'Root',
      children: [{
        name: 'Animals',
        children: [{
          name: 'Birds'
        }, {
          name: 'Cats',
          children: [{
            name: 'Siamese'
          }, {
            name: 'Tabby'
          }]
        }, {
          name: 'Dogs',
          children: [{
            name: 'Small Breeds',
            children: [{
              name: 'Chihuahua'
            }, {
              name: 'Italian Greyhound'
            }, {
              name: 'Japanese Chin'
            }]
          }, {
            name: 'Medium Breeds',
            children: [{
              name: 'Beagle'
            }, {
              name: 'Cocker Spaniel'
            }, {
              name: 'Pit Bull'
            }]
          }, {
            name: 'Large Breeds',
            children: [{
              name: 'Afghan'
            }, {
              name: 'Great Dane'
            }, {
              name: 'Mastiff'
            }]
          }]
        }]
      }, {
        name: 'Minerals',
        children: [{
          name: 'Zinc'
        }, {
          name: 'Gold',
          children: [{
            name: 'Yellow Gold'
          }, {
            name: 'White Gold'
          }]
        }, {
          name: 'Silver'
        }]
      }, {
        name: 'Vegetables',
        children: [{
          name: 'Carrot'
        }, {
          name: 'Tomato'
        }, {
          name: 'Lettuce'
        }]
      }]
    };
  }
});
