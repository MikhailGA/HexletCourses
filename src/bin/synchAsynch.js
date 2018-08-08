import co from '../courses/synchAsynch/co';

co(function* () {
  const a = yield Promise.resolve(1);
  const b = yield Promise.resolve(2);
  const c = yield Promise.resolve(3);

  return [a, b, c]; // [1, 2, 3]
  // console.log(a);
});
// .then(data => console.log(data));
// [1, 2, 3]

// Promise.resolve(5).then((a) => { console.log(a); });
