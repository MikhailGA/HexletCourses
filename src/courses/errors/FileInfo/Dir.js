import Node from './Node'; // eslint-disable-line

export default class extends Node {
  isDirectory() { // eslint-disable-line
    return true;
  }

  isFile() {  // eslint-disable-line
    return false;
  }
}
