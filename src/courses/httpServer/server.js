import http from 'http';
import url from 'url';
import querystring from 'querystring';


export default users => http.createServer((request, response) => {
  request.on('end', () => {
    const reqURL = new URL(`http://${request.headers.host}${request.url}`);

    if (request.url === '/') {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(users).length}`,
      ];
      response.end(messages.join('\n'));
    } else if (request.url.startsWith('/search')) {
      // BEGIN (write your solution here)
      const searchString = reqURL.searchParams.get('q').toLowerCase();
      if (searchString) {
        const filterBook = Object.keys(users).reduce((acc, id) => {
          const normalizeName = users[id].name.toLowerCase();
          const { name, phone } = users[id];

          return normalizeName.indexOf(searchString) !== -1 ?
            [...acc, `${name}, ${phone}`] : acc;
        }, []);
        response.end(filterBook.join('\n'));
      } else {
        response.end('');
      }
      // END
    } else if (request.url.startsWith('/users.json')) {
      response.setHeader('Content-Type', 'application/json');

      // const page = Number(reqURL.searchParams.get('page')) || 1;
      // const perPage = Number(reqURL.searchParams.get('perPage')) || 10;
      const { query } = url.parse(request.url);
      const { page = 1, perPage = 10 } = querystring.parse(query);

      const totalPage = Math.ceil(Object.keys(users).length / perPage);

      const endRow = page * perPage;
      const startRow = endRow - perPage;

      const curentPage = Object.keys(users)
        .filter(id => (Number(id) > startRow && Number(id) <= endRow))
        .map(id => users[id]);

      const result = {
        meta: { page, perPage, totalPage },
        data: [...curentPage],
      };

      response.end(JSON.stringify(result));
    }
  });

  request.resume();
});
