function co(gen) {
  const coroutine = gen();

  return new Promise((resolve, reject) => {
    const iter = ({ value, done }) => {
      if (!done) {
        value.then((data) => {
          try {
            iter((coroutine.next(data)));
          } catch (e) {
            reject(e);
          }
        }).catch((e) => {
          try {
            iter(coroutine.throw(e));
          } catch (err) {
            reject(err);
          }
        });
      } else {
        resolve(value);
      }
    };

    iter(coroutine.next());
  });
}

export default co;
