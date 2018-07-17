// import diff from '../courses/AsynchProg/fileCompare';
// import asyncFilter from '../courses/AsynchProg/asyncFilter';
// import waterfall from '../courses/AsynchProg/waterfall';
// import retry from '../courses/AsynchProg/retry';
import fs from 'fs';
import concat from '../courses/AsynchProg/concat';

const coll = ['/usr/file', '/usr/x86_64-w64-mingw32', '/usr/x86_64-w64-mingw32'];

concat(coll, fs.readdir, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

const coll2 = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
concat(coll2, (item, callback) => {
  callback(null, item);
}, (err, result) => {
  console.log(result);
});

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
