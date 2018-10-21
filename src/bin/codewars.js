const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const toArray = str => (str ? str.toLowerCase().split(' ') : []);

const has = (minorWords, str) => minorWords.some(minor => minor === str);


function titleCase(title, minorWords) {
  if (title.length === 0) return '';
  const [first, ...rest] = toArray(title);
  const minorArr = toArray(minorWords);

  const tail = rest.map(str => (
    has(minorArr, str) ? str : capitalize(str)));

  return [capitalize(first), ...tail].join(' ');
}

console.log(titleCase('title OF', 'oF'));
console.log('The Wind in the Willows');
