import _ from 'lodash';

const myTypeOf = (item) => {
  if (Array.isArray(item)) {
    return 'array';
  } else if (typeof item === 'object') {
    return 'object';
  }
  return 'string';
};

const singleTagsList = new Set(['hr', 'img', 'br']);

const parse = (dsl) => {
  const [tagName, ...rest] = dsl;
  const child = _.find(rest, item => myTypeOf(item) === 'array');
  const attributes = _.find(rest, item => myTypeOf(item) === 'object');
  const body = _.find(rest, item => myTypeOf(item) === 'string');
  return {
    name: tagName,
    attributes: (attributes !== undefined) ? attributes : {},
    body: (body !== undefined) ? body : '',
    children: (child) ? [...child.map(item => parse(item))] : [],
  };
};

const buildAttribute = (obj) => {
  if (obj) {
    return Object.keys(obj).reduce((acc, item) => (`${acc} ${item}="${obj[item]}"`), '');
  }
  return '';
};

const render = (ast) => {
  const {
    name,
    attributes,
    body,
    children,
  } = ast;
  if (singleTagsList.has(name)) {
    return [`<${name}`, buildAttribute(attributes), '>'].join('');
  }
  return [`<${name}`, buildAttribute(attributes), '>', body, ...children.map(item => render(item)), `</${name}>`].join('');
};

export { parse, render };
