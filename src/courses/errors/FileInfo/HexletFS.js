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

  // touchSync(filepath) {
  //   const { dir, base } = path.parse(filepath);
  //   return this.findNode(dir).addChild(base, new File(base));
  // }

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

  touchSync(dirPath) {
    const result = pathIsOk(dirPath);
    if (result) {
      this.addItemRecursiv(dirPath, File, true);
    }
    return result;
  }
}
