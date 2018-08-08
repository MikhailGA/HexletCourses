export default (uri, param) => {
  const myURL = new URL(uri);

  const newSearchParams = new URLSearchParams(param);

  newSearchParams.forEach((value, name) => {
    if (value === 'null') {
      myURL.searchParams.delete(name);
    } else {
      myURL.searchParams.set(name, value);
    }
  });
  return myURL.toString();
};
