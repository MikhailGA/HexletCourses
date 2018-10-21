import http from 'http';

const mergeQueryParam = (uri, param) => {
  const searchParams = new URLSearchParams(uri.searchParams);
  const newSearchParams = new URLSearchParams(param);

  newSearchParams.forEach((value, name) => {
    if (value === 'null') {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }
  });
  return searchParams;
};

// BEGIN (write your solution here)
export default (queryParams) => {
  const { method, data ='', url, params, headers } = queryParams; // eslint-disable-line
  const myURL = new URL(url);
  const mergeParams = mergeQueryParam(myURL, params);
  const postData = (new URLSearchParams(data)).toString();
  const queryStringParams = mergeParams.toString() === '' ? '' : `?${mergeParams.toString()}`;

  const options = {
    hostname: myURL.hostname,
    port: myURL.port,
    path: `${myURL.pathname}${queryStringParams}`,
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      ...headers,
    },
  };
  console.log(options);
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const body = [];
      res.on('data', (chunk) => {
        body.push(chunk.toString());
      }).on('end', () => {
        const responseData = body.join('');
        resolve({
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          data: responseData,
        });
      });
    });

    req.on('error', (e) => {
      reject(`problem with request: ${e.message}`); // eslint-disable-line
    });
    // write data to request body
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};
// END
