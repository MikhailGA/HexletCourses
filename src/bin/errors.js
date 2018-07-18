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
files.mkdirSync('/etc');
files.mkdirSync('/opt');
files.touchSync('/opt/file.txt');
files.mkdirpSync('/etc/nginx/conf.d');
files.touchSync('/etc/nginx/nginx.conf');
files.mkdirpSync('/usr/admin/docs');


console.log(files.rmdirSync('/usr/admin/docs'));

console.log(files.readdirSync('/usr/admin/docs'));


console.log();

// files.rmdirSync('/etc/nginx/conf.d');
// expect(files.readdirSync('/etc/nginx')).toEqual(['nginx.conf']);

// expect(files.rmdirSync('/etc/unknown')).toBe(false);
// expect(files.rmdirSync('/etc/nginx')).toBe(false);

// expect(files.rmdirSync('/etc/nginx/nginx.conf')).toBe(false);

// files.rmdirSync('/usr/admin/docs');
// expect(files.readdirSync('/usr/admin/docs')).toBe(false);
