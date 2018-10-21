import fs from 'fs';
import path from 'path';

import makeServer from './server';

const filename = 'phonebook.txt';
const dir = '/home/mihail/nodeProject/HexletCourses/src/courses/httpServer';
const pathFile = path.join(dir, filename);

// const rawUsersToJSON = (rawBook) => {
//   const phoneArr = String(rawBook).split('\n')
//     .map(item => item.split('|')
//       .map(str => str.trim()));

//   const newBook = phoneArr.map((item) => {
//     const [id, name, phone] = item;
//     return { [id]: { name, phone } };
//   });

//   return newBook.reduce((acc, item) => ({ ...acc, ...item }), {});
// };

export default (port, callback = () => {}) => {
  fs.readFile(pathFile, (err, data) => {
    if (err) {
      throw err;
    }
    // BEGIN (write your solution here)
    const users = data.toString()
      .trim()
      .split('\n')
      .reduce((acc, value) => {
        const [id, name, phone] = value.split('|').map(item => item.trim());
        return { ...acc, [id]: { name, phone } };
      }, {});
    // END

    const server = makeServer(users);
    server.listen(port, () => callback(server));
  });
};
