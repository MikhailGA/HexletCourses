export default (functions, callback) => {
  if (functions.length === 0) {
    return callback();
  }

  const next = ([head, ...rest], previosResult) => {
    const cb = (err, ...args) => {
      if (err) {
        callback(err, args);
      }
      if (rest.length === 0) {
        callback(err, args);
      } else {
        next(rest, args);
      }
    };
    head(...previosResult, cb);
  };
  next(functions, []);
};
