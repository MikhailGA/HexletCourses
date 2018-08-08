import { init, cancel } from '../courses/fsm/order/solution';

const order = init([]);

order.accept();
order.ship();

console.log(order.state);
console.log(order.history);

cancel(order);

console.log(order.state);
order.history.forEach((element) => {
  const { state, createdAt } = element;
  console.log(`${state} - ${createdAt}`);
});
