// import Express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';

import Post from './entities/Post';

const homePath = '/home/mihail/nodeProject/HexletCourses/src/courses/appBlog/views';
const express = require('express');

export default () => {
  // const app = new Express();
  const app = express();
  app.use(morgan('combined'));
  app.set('view engine', 'pug');
  // app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
  app.use(methodOverride('_method'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
  }));

  let posts = [
    new Post('hello', 'how are your?'),
    new Post('nodejs', 'story about nodejs'),
  ];

  app.get('/', (req, res) => {
    res.render(`${homePath}/index`);
  });

  app.get('/posts', (req, res) => {
    res.render(`${homePath}/posts/index`, { posts });
  });

  app.get('/posts/new', (req, res) => {
    res.render(`${homePath}/posts/new`, { form: {}, errors: {} });
  });

  app.get('/posts/:id', (req, res, next) => {
    const post = posts.find(p => p.id.toString() === req.params.id);
    if (post) {
      res.render(`${homePath}/posts/show`, { post });
    } else {
      next(new Error('Something was wrong'));
    }
  });

  app.post('/posts', (req, res) => {
    const { title, body } = req.body;

    const errors = {};
    if (!title) {
      errors.title = "Title can't be blank";
    }

    if (!body) {
      errors.body = "Body can't be blank";
    }

    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect(`/posts/${post.id}/edit`);
      return;
    }

    res.status(422);
    res.render(`${homePath}/posts/new`, { form: req.body, errors });
  });

  app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id.toString() === req.params.id);
    const errors = {};
    res.render(`${homePath}/posts/edit`, { form: { ...post }, errors });
  });

  app.patch('/posts/:id', (req, res) => {
    const { title, body } = req.body;
    const post = posts.find(p => p.id.toString() === req.params.id);

    const errors = {};
    if (!title) {
      errors.title = "Title can't be blank";
    }

    if (!body) {
      errors.body = "Body can't be blank";
    }

    if (Object.keys(errors).length === 0) {
      post.title = title;
      post.body = body;
      res.status(302);
      res.render(`${homePath}/posts/show`, { post });
      return;
    }

    res.status(422);
    res.render(`${homePath}/posts/edit`, { form: { ...post }, errors });
  });

  app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(p => p.id.toString() !== req.params.id);
    res.status(302);
    res.render(`${homePath}/posts/index`, { posts });
  });

  app.use((err, req, res, next) => {  // eslint-disable-line
    res.status(500);
    res.render(`${homePath}/500`);
  });

  app.use((req, res) => {
    res.status(404);
    res.render(`${homePath}/404`);
  });

  return app;
};
