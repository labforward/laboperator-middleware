const argv = require('./argv');
const app = require('..');
const config = require('../config');

app.listen(argv.port, () => {
  config.logger.info(`Listening at PORT: ${argv.port}`);
});
