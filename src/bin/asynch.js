// import diff from '../courses/AsynchProg/fileCompare';
// import asyncFilter from '../courses/AsynchProg/asyncFilter';
// import waterfall from '../courses/AsynchProg/waterfall';
// import retry from '../courses/AsynchProg/retry';
// import concat from '../courses/AsynchProg/concat';
// import filter from '../courses/AsynchProg/filter';
// import fs from 'fs';
import Tree from '../courses/AsynchProg/eventEmmiter';

const tree = new Tree('test');

tree.on('add', (node) => {
  console.log('add %s', node.getKey());
});
tree.on('remove', (node) => {
  console.log('remove %s', node.getKey());
});

tree.addChild('children1');
tree.addChild('children2');
tree.addChild('children3');
tree.removeChild('children2');
const keys = tree.getChildren();

keys.forEach((val, key) => {
  console.log(key);
});
// import EventEmitter from 'events';

// class Clock extends EventEmitter {
//   start() {
//     let tic = true;
//     this.interval = setInterval(() => {
//       const event = tic ? 'tic' : 'toc';
//       this.emit(event, Date.now());
//       tic = !tic;
//     }, 1000);
//   }

//   stop() {
//     clearInterval(this.interval);
//   }
// }

// const clock = new Clock();

// clock.on('tic', (t) => { console.log('tic: %d', t); });
// clock.on('toc', (t) => { console.log('toc: %d', t); });

// clock.start();

// setTimeout(() => {
//   clock.stop();
// }, 5000);
// fs.access('/home/mihail/nodeProject', (err) => {
//   console.log(err);
//   console.log(err ? 'file not access' : 'file access');
// });

// const coll = ['/home/mihail/nodeProject', '/home/mihail/files1', '/home/mihail/files3'];

// filter(coll, (filePath, callback) => {
//   fs.access(filePath, (err) => {
//     console.log(err);
//     callback(null, err);
//   });
// }, (err, results) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(results);
// });
// concat(coll, fs.readdir, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const coll2 = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
// concat(coll2, (item, callback) => {
//   callback(null, item);
// }, (err, result) => {
//   console.log(result);
// });

// const once = (fn) => {
//   let uses = false;
//   return (...args) => {
//     if (uses) return;
//     uses = true;
//     fn(...args);
//   };
// };

// const myF = (a) => { console.log(a); };

// const myFOnce = once(myF);

// myFOnce('lol');
// myFOnce('lol');

// fs.readdir('/usr', (err, data) => {
//   console.log(data);
// });
