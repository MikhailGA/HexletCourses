import fs from 'fs';

const compare = (data1, data2) => {
  const lines1 = data1.split('\n').slice(0, -1);
  const lines2 = data2.split('\n').slice(0, -1);

  // BEGIN (write your solution here)
  const maxLenght = (lines1.length > lines2.length) ? lines1.length : lines2.length;
  let i = 0;
  const arr = [];
  while (i < maxLenght) {
    if (lines1[i] !== lines2[i]) {
      const a = (lines1[i] === undefined) ? null : lines1[i];
      const b = (lines2[i] === undefined) ? null : lines2[i];
      arr.push([a, b]);
    }
    i += 1;
  }
  return arr;
  // END
};

// BEGIN (write your solution here)
function diff(path1, path2, callback) {
  fs.readFile(path1, 'utf8', (err1, data1) => {
    if (err1) {
      callback(err1, undefined);
    } else {
      fs.readFile(path2, 'utf8', (err2, data2) => {
        if (err2) {
          callback(err2, undefined);
        } else {
          callback(null, compare(data1, data2));
        }
      });
    }
  });
}

export default diff;
// END
