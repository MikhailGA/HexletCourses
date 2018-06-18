// import path from 'path';
// import Tree from '../courses/errors/Tree';
import HexletFS from '../courses/errors/FileInfo/HexletFS';

// const tree = new Tree('/');
// tree.addChild('var')
//   .addChild('lib')
//   .addChild('run');
// tree.addChild('etc');
// tree.addChild('home');

// const result = tree.getChildren().map(child => child.getKey());
// console.log(result);

// console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));

const files = new HexletFS();

console.log(files.mkdirpSync('/etc/etc2.w'));
console.log(files.findNode('/etc'));
console.log(files.findNode('/etc/etc2.w'));
// files.mkdirSync('/etc/nginx');
// const etc = files.findNode('/etc');

// console.log(files.statSync('/etc').isDirectory());

// files.mkdirSync('/etc/nginx');
// console.log(files.statSync('/etc/nginx').isDirectory());
