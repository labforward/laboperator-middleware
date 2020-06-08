const config = require('laboperator-middleware/config');
const helpers = require('laboperator-middleware/test_helper');

helpers.addFixtures(config.example.url.origin, require('./fixtures'));

module.exports = helpers;
