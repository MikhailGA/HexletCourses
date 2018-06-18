import Node from './Node'; // eslint-disable-line

export default class extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  isDirectory() { // eslint-disable-line
    return false;
  }

  isFile() {  // eslint-disable-line
    return true;
  }
}
