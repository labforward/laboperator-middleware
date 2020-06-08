require('./chai.spec');
const fetchHelpers = require('./fetch.spec');

module.exports = {
  ...fetchHelpers,
  server: require('./server.spec'),
};
