import path from 'path';

import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';

import config from './config';
import * as helpers from './helpers';
import routes from './routes';

const app = express();

app.use(logger('dev', { stream: config.logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

if (path.resolve(__dirname) !== path.resolve('./dist')) {
  helpers.requireRelative('./dist/routes')(app);
}

// default 404 routes
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  const status = err.status || 500;

  if (status !== 200) config.logger.error(err);

  res.status(status);
  res.json(helpers.jsonResponse(status, helpers.getErrorMessage(err)));
});

export default app;
