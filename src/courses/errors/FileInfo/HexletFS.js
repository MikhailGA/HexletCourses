import path from 'path';
import Tree from '../Tree'; // eslint-disable-line

import Dir from './Dir';
import File from './File';

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

const pathIsOk = (ItemPath) => {
  const parts = getPathParts(ItemPath);
  return parts.slice(0, parts.length - 1)
    .reduce((acc, item) => (item.indexOf('.') === -1 ? acc : false), true);
};

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new Dir(base));
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }

  addItemRecursiv(dirIter, NewItem, lastItem) {
    const { dir, base } = path.parse(dirIter);
    const node = this.findNode(dir);
    if (node === undefined) {
      return this.addItemRecursiv(dir, Dir, false)
        .addChild(base, (lastItem ? new NewItem(base) : new Dir(base)));
    }
    return node.addChild(base, (lastItem ? new NewItem(base) : new Dir(base)));
  }

  mkdirpSync(dirPath) {
    const result = pathIsOk(dirPath);
    if (result) {
      this.addItemRecursiv(dirPath, Dir, true);
    }
    return result;
  }

  touchSync(filepath) {
    const { ext } = path.parse(filepath);
    if (ext === '') {
      return false;
    }
    const result = pathIsOk(filepath);
    if (result) {
      this.addItemRecursiv(filepath, File, true);
    }
    return result;
  }

  readdirSync(dirPath) {
    const { ext } = path.parse(dirPath);
    if (ext !== '') {
      return false;
    }
    const node = this.findNode(dirPath);
    return (node) ? node.getChildren().reduce((acc, item) => [...acc, item.getKey()], []) : false;
  }

  rmdirSync(dirPath) {
    const node = this.findNode(dirPath);
    if (node && !node.hasChildren() && this.statSync(dirPath).isDirectory()) {
      const key = node.getKey();
      node.getParent().removeChild(key);
      return true;
    }
    return false;
  }
}
