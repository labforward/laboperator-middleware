import { Express, Request, Response } from 'express';

import { jsonResponse, propagateErrors } from '~/helpers';

export default (app: Express): void => {
  const laboperator = require('../laboperator');

  app.get('/', (_req: Request, res: Response) => {
    res.json(jsonResponse(200));
  });

  app.get(
    '/auth/callback',
    propagateErrors(async (req, res) => {
      await laboperator.apis.authorizeUser(req.query);

      res.format({
        'application/json': () => {
          res.json(jsonResponse(200));
        },
        'text/html': () => {
          res.send('<script>window.close()</script>');
        },
      });
    })
  );
};
