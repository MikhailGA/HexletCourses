import SingleTag from '../courses/prototype/tags2/SingleTag';
import PairedTag from '../courses/prototype/tags2/PairedTag';
import parse from '../courses/prototype/Parse';

const data = ['html', [
  ['head', [
    ['title', 'hello, hexlet!'],
  ]],
  ['body', [
    ['h1', { class: 'header' }, 'html builder example'],
    ['div', [
      ['span', 'span text'],
      ['hr'],
    ]],
  ]],
]];

const exp = new PairedTag('html', {}, '', [
  new PairedTag('head', {}, '', [
    new PairedTag('title', {}, 'hello, hexlet!'),
  ]),
  new PairedTag('body', {}, '', [
    new PairedTag('h1', { class: 'header' }, 'html builder example'),
    new PairedTag('div', {}, '', [
      new PairedTag('span', {}, 'span text'),
      new SingleTag('hr'),
    ]),
  ]),
]);

const ast = parse(data);
console.log(ast.toString());

console.log(exp.toString());
