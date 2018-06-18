import _ from 'lodash';

const propertyAction = [
  {
    name: 'attribute',
    check: arg => arg instanceof Object,
  },
  {
    name: 'body',
    check: arg => typeof arg === 'string',
  },
  {
    name: 'children',
    check: arg => arg instanceof Array,
  },
];

const getPropertiAction = arr => _.find(propertyAction, ({ check }) => check(arr));

const buildAttrString = attrs =>
  Object.keys(attrs).map(key => ` ${key}="${attrs[key]}"`).join('');

const buildHTML2 = (dsl) => {
  const [nameTag, ...rest] = dsl;
  const root = {
    name: nameTag,
    attribute: {},
    body: '',
    children: [],
  };

  const tag = rest
    .reduce((acc, item) => {
      const { name } = getPropertiAction(rest);
      return { ...acc, [name]: item };
    }, root);

  return [`<${tag.name}${buildAttrString(tag.attributes)}>`,
    `${tag.body}${tag.children.map(buildHTML2).join('')}`,
    `</${tag.name}>`,
  ].join('');
};

export default buildHTML2;
