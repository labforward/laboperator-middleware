const fs = require('fs');
const config = require('../config');

module.exports = (path) => () => {
  if (!fs.existsSync(path)) return undefined;

  let data;

  try {
    config.logger.debug(`[STORE] Started loading from ${path}`);

    data = JSON.parse(fs.readFileSync(path));

    config.logger.debug(`[STORE] Completed loading from ${path}`);
  } catch (e) {
    config.logger.debug(`[STORE] Failed loading from ${path}: ${e.message}`);
  }

  return data;
};
