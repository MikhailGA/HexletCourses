import SingleTag from './tags2/SingleTag';
import PairedTag from './tags2/PairedTag';

const singleTagsList = new Set(['hr', 'img', 'br']);

const buildNode = (name, ...args) => {
  const Tag = singleTagsList.has(name) ? SingleTag : PairedTag;
  return new Tag(name, ...args);
};

export default buildNode;
