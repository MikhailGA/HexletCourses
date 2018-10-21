import Express from 'express';
import morgan from 'morgan';

export default (port, callback) => {
  const app = new Express();
  const logger = morgan('combined');
  app.use(logger);

  const infoStr = '204 no content';
  let counter = 0;

  app.get('/', (req, res) => {
    res.json({ value: counter });
  });

  app.post('/increment', (req, res) => {
    counter += 1;
    res.status(204);
    res.send(infoStr);
  });

  app.post('/decrement', (req, res) => {
    counter -= 1;
    res.status(204);
    res.send(infoStr);
  });

  app.put('/set', (req, res) => {
    const { value } = req.query;
    counter = +value;
    res.status(204);
    res.send(infoStr);
  });

  app.delete('/reset', (req, res) => {
    counter = 0;
    res.status(204);
    res.send(infoStr);
  });

  app.listen(port, callback);
  // return app;
};
