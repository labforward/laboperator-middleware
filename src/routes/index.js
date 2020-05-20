const helpers = require('../helpers');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json(helpers.jsonResponse(200));
  });
};
