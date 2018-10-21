import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import counter from '../courses/express/counter';

axios.defaults.adapter = httpAdapter;

const params = new URLSearchParams({ a: 123 });

const host = 'localhost';
const port = 8080;
const path = '';

const url = `http://${host}:${port}${path}?${params.toString()}`;

counter(port, async () => {
  const response = await axios.get(url);
  console.log(response.status);
  console.log(response.data);
});
