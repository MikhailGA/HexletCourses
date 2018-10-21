import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import makeServer from '../courses/httpServer/index';

axios.defaults.adapter = httpAdapter;

const host = 'localhost';
const port = 8080;
const url = `http://${host}:${port}/users.json?`;
// const query = new URLSearchParams({ b: 'testParam' });

makeServer(port, async () => {
  const response = await axios.get(url);
  // console.log(response.status);
  console.log(response.data);
});
