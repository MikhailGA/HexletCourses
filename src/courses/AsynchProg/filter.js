const noop = () => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

// BEGIN (write your solution here)
export default (coll, functionAsynch, callback = noop) => { // eslint-disable-line
  if (coll.length === 0) {
    return callback(null, []);
  }
  const onceCallback = once(callback);

  const next = ([head, ...rest], previosResult) => {
    const cb = (err, data) => {
      if (err) {
        onceCallback(err);
      }
      const newResult = (data) ? previosResult.concat(head) : previosResult;
      if (rest.length === 0) {
        onceCallback(err, newResult);
      } else {
        next(rest, newResult);
      }
    };
    functionAsynch(head, cb);
  };
  next(coll, []);
};
// END
