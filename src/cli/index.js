const argv = require('./argv');
const app = require('..');
const helpers = require('../helpers');

app.listen(argv.port, () => {
  helpers.logger.info(`Listening at PORT: ${argv.port}`);
});
