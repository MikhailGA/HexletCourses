import StateMachine from 'javascript-state-machine';


export default class Order {
  constructor(items) {
    this.items = items;
    this.history = [];

    this._fsm(); // eslint-disable-line
  }
}

StateMachine.factory(Order, {
  init: 'init',
  transitions: [
    // BEGIN (write your solution here)
    { name: 'accept',   from: 'init',                   to: 'pending'    },   // eslint-disable-line
    { name: 'ship',     from: 'pending',                 to: 'shipped'   },  // eslint-disable-line
    { name: 'complete', from: 'shipped',                to: 'completed' },// eslint-disable-line
    { name: 'cancel',   from: ['init', 'pending'],       to: 'canceled'  }, // eslint-disable-line
    { name: 'refund',   from: ['shipped', 'completed'], to: 'refunded'  }, // eslint-disable-line
    // END
  ],
  // data: { history: [1, 2] },
  methods: {
    // BEGIN (write your solution here)
    onEnterState: function ({ to }) {        // eslint-disable-line
      if (this.state !== 'init') {
        this.history.push({ state: to, createdAt: new Date() });
      }
    },
    // END
  },
});

