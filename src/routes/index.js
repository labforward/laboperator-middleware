const helpers = require('../helpers');

module.exports = (app) => {
  const laboperator = require('../laboperator');

  app.get('/', (req, res) => {
    res.json(helpers.jsonResponse(200));
  });

  app.get(
    '/auth/callback',
    helpers.propagateErrors(async (req, res) => {
      await laboperator.apis.authenticateUser(req.query);

      res.format({
        'application/json': () => {
          res.json(helpers.jsonResponse(200));
        },
        'text/html': () => {
          res.send('<script>window.close()</script>');
        },
      });
    })
  );
};
