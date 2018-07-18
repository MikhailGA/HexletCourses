import EventEmitter from 'events';

class Tree extends EventEmitter {
  constructor(key, parent) {
    super();
    this.parent = parent;
    this.key = key;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getParent() {
    return this.parent;
  }

  // BEGIN (write your solution here)
  addChild(key) {
    const newNode = new Tree(key, this);
    this.children.set(key, newNode);
    this.emit('add', newNode);
  }

  removeChild(key) {
    this.emit('remove', this.children.get(key));
    this.children.delete(key);
  }

  getChildren() {
    return this.children;
  }
  // END
}

export default Tree;
