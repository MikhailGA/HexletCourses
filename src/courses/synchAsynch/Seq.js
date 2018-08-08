const makeIterator = function () { // eslint-disable-line
  let value = this.from;
  let currentCount = 0;

  const next = () => {
    if (currentCount < this.count) {
      value = currentCount ? this.fn(value) : value;
      currentCount += 1;
      return { value, done: false };
    }
    return { done: true };
  };
  return { next };
};

class Seq {
  constructor(from = 0, fn, count = Infinity) {
    this.from = from;
    this.fn = fn;
    this.count = count;
    this[Symbol.iterator] = makeIterator;
  }

  skip(num) {
    let newFrom = this.from;
    for (let i = 0; i < num; i += 1) {
      newFrom = this.fn(newFrom);
    }
    return new Seq(newFrom, this.fn, this.count);
  }

  take(num) {
    return new Seq(this.from, this.fn, num);
  }
}

export default Seq;
