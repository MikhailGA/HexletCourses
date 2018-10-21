import co from '../courses/synchAsynch/co';

const getPromise = (val, err) =>
  new Promise((resolve, reject) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(val);
  });

// co(function* () { // eslint-disable-line
//   const a = yield Promise.resolve(1);
//   try {
//     const b = yield getPromise(1, new Error('Alert message'));
//   } catch (e) {
//     console.log(e.message);
//   }
//   const c = yield Promise.resolve(3);
//   console.log(`${a} - ${c}`);
//   return [a, c]; // [1, 2, 3]
// });

co(function* () { // eslint-disable-line
  yield getPromise(1, new Error('boom'));
  const c = yield Promise.resolve(3);
  return c;
}).then(data => console.log(data))
  .catch((e) => { console.log(e.message); });
// [1, 2, 3]

// Promise.resolve(5).then((a) => { console.log(a); });
