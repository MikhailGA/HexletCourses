import Node from './Node';

export default class extends Node {
  constructor(name, attributes = {}) {
    super(name, attributes);
  }
  toString() {
    return `<${this.name}${this.getAttributesAsLine()}>`;
  }

  getAttributesAsLine() {
    return Object.keys(this.attributes)
      .reduce((acc, key) => `${acc} ${key}="${this.attributes[key]}"`, '');
  }
}
