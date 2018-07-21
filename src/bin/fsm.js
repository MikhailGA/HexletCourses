import awk from '../courses/fsm/awk';

const text = '  what who   \nhellomy\n hello who are you\n';
console.log(Array.from(text));
const data = [
  '\n\n  what who   \n',
  'hellomy\n',
  ' hello who are you\n',
];
const result = awk(data.join(''));
console.log(result);
// [
//   'what',
//   'hellomy',
//   'hello',
// ];
