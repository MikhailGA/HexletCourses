export default (text) => {
  let result = '';
  let state = 'before';

  for (let i = 0; i < text.length; i += 1) {
    switch(state) { // eslint-disable-line
      case 'before':
        if (text[i] !== ' ') {
          state = 'inside';
          result += text[i];
        }
        break;
      case 'inside':
        if (text[i] === ' ') {
          state = 'after';
          result += ',';
        } else if (text[i] === '\n') {
          state = 'before';
          result += ',';
        } else {
          result += text[i];
        }
        break;
      case 'after':
        if (text[i] === '\n') {
          state = 'before';
        }
        break;
    }
  }
  return result.split(',').filter(a => a !== '\n' && a);
};
