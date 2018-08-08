const co = (gen) => {
  const coroutine = gen();
  const { value } = coroutine.next();
  value.then((data) => {
    const result = coroutine.next(data);
    if (!result.done) {
      co(gen);
    } else {
      console.log(result.value);
    }
  });
};

export default co;
