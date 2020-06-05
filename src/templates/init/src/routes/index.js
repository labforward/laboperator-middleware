const helpers = require('laboperator-middleware/helpers');

const { fetch } = helpers;

module.exports = (app) => {
  app.get('/ping', async (req, res) => {
    const response = await fetch({ url: 'http://example.com/ping' });

    res.json(helpers.jsonResponse(200, response.body));
  });
};
