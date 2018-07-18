import Node from './Node';

function PairedTag(name, attributes = {}, body = '', children = []) {
  Node.apply(this, [name, attributes]);
  this.body = body;
  this.children = children;
}

PairedTag.prototype = Object.create(Node.prototype);

PairedTag.prototype.toString = function toString() {
  const value = (this.children.length > 0) ? this.children.join('') : this.body;
  return `<${this.name}${this.getAttributesAsLine()}>${value}</${this.name}>`;
};

export default PairedTag;
