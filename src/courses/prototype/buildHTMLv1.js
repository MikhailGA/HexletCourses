import _ from 'lodash';

const myTypeOf = (item) => {
  if (Array.isArray(item)) {
    return 'array';
  } else if (typeof item === 'object') {
    return 'object';
  }
  return 'string';
};

const getAttribute = (arr) => {
  const obj = _.find(arr, item => myTypeOf(item) === 'object');
  if (obj) {
    return Object.keys(obj).reduce((acc, item) => (`${acc} ${item}="${obj[item]}"`), '');
  }
  return '';
};

const buildHtml = (tree) => {
  const [tagName, ...args] = tree;
  const attribute = getAttribute(args);
  const body = _.find(args, item => myTypeOf(item) === 'string');
  const child = _.find(args, item => myTypeOf(item) === 'array');
  if (child) {
    const result = child.reduce((acc, item) => [...acc, ...buildHtml(item)], []);
    return [`<${tagName}`, attribute, '>', ...result, `</${tagName}>`].join('');
  }
  return [`<${tagName}`, attribute, '>', body, `</${tagName}>`];
};

export default buildHtml;
