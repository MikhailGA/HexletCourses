export default (retryCount, fn, callback) => { // eslint-disable-line
  if (retryCount === 0) {
    return callback();
  }

  const next = count => { // eslint-disable-line
    const cb = (err, body) => { // eslint-disable-line
      if (count === 1) {
        return callback(err, body);
      }
      if (err) {
        next(count - 1);
      } else {
        return callback(err, body);
      }
    };
    fn(cb);
  };
  next(retryCount);
};
