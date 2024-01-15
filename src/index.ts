import path from 'path';

import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger, { StreamOptions } from 'morgan';
import { FetchErrorResponse } from 'swagger-client';

import config from './config';
import { getErrorMessage, jsonResponse, requireRelative } from './helpers';
import routes from './routes';

const app = express();
const stream: StreamOptions = {
  write: (message: string) => config.logger.info(message),
};

app.use(logger('dev', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

if (process.env.NODE_ENV === 'test') {
  if (path.resolve(__dirname, '../src') !== path.resolve('./src')) {
    requireRelative('./src/routes').default(app);
  }
} else if (path.resolve(__dirname) !== path.resolve('./dist')) {
  requireRelative('./dist/routes').default(app);
}

// default 404 routes
app.use((_req: Request, _res: Response, next: NextFunction): void => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: Error | FetchErrorResponse,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void => {
    const status = (err as FetchErrorResponse).status || 500;

    if (status !== 200) config.logger.error(err);

    res.status(status);
    res.json(jsonResponse(status, getErrorMessage(err)));
  },
);

export default app;
