import path from 'path';
import Tree from '../Tree'; // eslint-disable-line

import Dir from './Dir';
import File from './File';

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    return current.getMeta().getStats();
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new File(base));
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new Dir(base));
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }

  mkdirpSync(dirPath) {
    const iter = (dirIter) => {
      const { dir, base } = path.parse(dirIter);
      const { ext } = path.parse(dir);
      if (ext !== '') {
        return false;
      }
      const node = this.findNode(dir);
      if (node === undefined) {
        return (iter(dir)) ? iter(dir).addChild(base, new Dir(base)) : false;
      }
      return node.addChild(base, new Dir(base));
    };
    return (iter(dirPath) === false) ? iter(dirPath) : true;
  }

  touchSync(dirPath) {
    
  }
}
