const initID = () => {
  let firstID = 0;
  return () => {
    firstID += 1;
    return firstID;
  };
};

const getID = initID();

export default class {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = getID();
  }
}
