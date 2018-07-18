import path from 'path';
import Tree from './Tree';

// BEGIN (write your solution here)
const getPathParts = (filePath) => {
  const pathNormalaize = path.normalize(filePath).split(path.sep)
    .filter(item => item !== '');

  return pathNormalaize;
};

const parsePath = (filePath) => {
  const partsNormalize = path.normalize(filePath);
  return path.parse(partsNormalize);
};
// END

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  // BEGIN (write your solution here)
  isDirectory(dirPath) {
    const parts = getPathParts(dirPath);
    const node = this.tree.getDeepChild(parts);
    if (node === undefined) {
      return false;
    }
    const { type } = node.getMeta();
    return (type === 'dir');
  }

  isFile(filePath) {
    const parts = getPathParts(filePath);
    const node = this.tree.getDeepChild(parts);
    if (node === undefined) {
      return false;
    }
    const { type } = this.tree.getDeepChild(parts).getMeta();
    return (type === 'file');
  }

  mkdirSync(dirPath) {
    const { name, dir } = parsePath(dirPath);
    if (dir === '/') {
      return this.tree.addChild(name, { type: 'dir' });
    }
    const node = this.findNode(dir);
    return (node !== undefined) ? node.addChild(name, { type: 'dir' }) : false;
  }

  touchSync(filePath) {
    const { base, dir } = parsePath(filePath);
    if (dir === '/') {
      return this.tree.addChild(base, { type: 'file' });
    }
    const node = this.findNode(dir);
    return (node !== undefined) ? node.addChild(base, { type: 'file' }) : false;
  }
  // END

  findNode(filePath) {
    const parts = getPathParts(filePath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
