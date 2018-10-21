import morgan from 'morgan';
import uaParser from 'ua-parser-js';
// import Express from 'express';

const express = require('express');

export default () => {
  const app = express();
  // const app = new Express();
  app.use(morgan('combined'));

  app.use((req, res, next) => {
    req.useragent = uaParser(req.headers['user-agent']);
    next();
  });

  app.use((req, res) => {
    res.send(req.useragent);
  });

  return app;
};
