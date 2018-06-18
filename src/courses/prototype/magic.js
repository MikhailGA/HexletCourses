function magic(...args) {
  const sum = args.reduce((acc, item) => acc + item, 0);
  const result = (this === undefined) ? sum : this + sum;

  function mapping(...arr) {
    return magic.apply(result, arr);
  }
  mapping.valueOf = () => result;

  return mapping;
}

export default magic;
