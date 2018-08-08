import Order from './Order';

export const init = items => new Order(items);

// BEGIN (write your solution here)
export const cancel = (item) => {
  if (item.can('cancel')) {
    item.cancel();
  }
};
// END
