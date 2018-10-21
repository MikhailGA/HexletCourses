// import Express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// import flash from 'flash';

import encrypt from './encrypt';
import User from './entities/User';
import Guest from './entities/Guest';
import flash from './flash';

const express = require('express');

const homePath = '/home/mihail/nodeProject/HexletCourses/src/courses/sessions/views/';

export default () => {
  // const app = new Express();
  const app = express();
  app.use(morgan('combined'));
  app.use(methodOverride('_method'));
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
  app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(flash());

  const users = [new User('admin', encrypt('qwerty'))];

  app.use((req, res, next) => {
    if (req.session && req.session.nickname) {
      const { nickname } = req.session;
      res.locals.currentUser = users.find(user => user.nickname === nickname);
    } else {
      res.locals.currentUser = new Guest();
    }
    next();
  });

  app.get('/', (req, res) => {
    res.render(`${homePath}index`);
  });

  app.get('/users/new', (req, res) => {
    const errors = {};
    res.render(`${homePath}users/new`, { form: {}, errors });
  });

  app.post('/users', (req, res) => {
    const { nickname, password } = req.body;
    const errors = {};
    if (!nickname) {
      errors.nickname = 'Please inter your name!!!';
    } else if (users.find(user => user.nickname === nickname)) {
      errors.nickname = 'User name is bisy!! Try again';
    }

    if (!password) {
      errors.password = 'Please inter your password!!!';
    }

    if (Object.keys(errors).length === 0) {
      users.push(new User(nickname, encrypt(password)));
      res.flash('info', `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Welcome, ${nickname}!`);
      res.flash('info', `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Welcome, ${nickname}!`);
      res.redirect('/');
    } else {
      res.status(422).render(`${homePath}users/new`, { form: {}, errors });
    }
  });

  app.get('/session/new', (req, res) => {
    res.render(`${homePath}session/new`, { form: {}, errors: {} });
  });

  app.post('/session', (req, res) => {
    const { nickname, password } = req.body;
    // const errors = {};

    const registeredUser = users.find(user => user.nickname === nickname);
    if (!nickname || !password || !registeredUser || (registeredUser.password !== encrypt(password))) { //eslint-disable-line
      const errors = { message: 'Invalid nickname or password' };
      res.status(422).render(`${homePath}session/new`, { form: {}, errors });
    } else {
      req.session.nickname = registeredUser.nickname;
      res.redirect('/');
    }
  });

  app.delete('/session', (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        res.redirect('/');
      } else {
        console.log(err);
      }
    });
  });

  return app;
};
