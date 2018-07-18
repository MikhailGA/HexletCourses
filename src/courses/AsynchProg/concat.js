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
export default (coll, functionAsynch, callback = noop) => {  // eslint-disable-line
  if (coll.length === 0) {
    return callback(null, null);
  }

  const onceCallBack = once(callback);
  let result = [];
  let iter = 0;

  const cb = (err, data) => {
    iter += 1;
    if (err) {
      onceCallBack(err);
      return;
    }
    console.log(data);
    result = result.concat(data);
    if (iter === coll.length) {
      onceCallBack(err, result);
    }
  };

  coll.forEach((path) => { functionAsynch(path, cb); });
};
// END
