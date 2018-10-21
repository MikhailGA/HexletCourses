// import server from '../courses/appBlog/server';
// import server from '../courses/express/middleware';
import server from '../courses/sessions/server';

const port = 8080;

server().listen(port, () => {
  console.log('Server was running!');
});
