const config = require('../config');
const helpers = require('../helpers');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json(helpers.jsonResponse(200));
  });

  app.get('/auth/callback', async (req, res) => {
    let error;

    try {
      const laboperator = require('../laboperator');

      await laboperator.apis.authenticateUser(req.query);
    } catch (e) {
      config.logger.error(
        `Failed to authorize users: ${helpers.getErrorMessage(e)}`
      );
      error = e;
    }

    res.format({
      'application/json': () => {
        if (error) {
          const status = error.status || 500;

          res.status(status);
          res.json(
            helpers.jsonResponse(status, helpers.getErrorMessage(error))
          );
        } else {
          res.json(helpers.jsonResponse(200));
        }
      },
      'text/html': () => {
        res.send('<script>window.close()</script>');
      },
    });
  });
};
