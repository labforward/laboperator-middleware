const fs = require('fs');
const config = require('../config');

module.exports = (path) => (data) => {
  try {
    config.logger.debug(`[STORE] Started saving into ${path}`);

    fs.writeFileSync(path, JSON.stringify(data));

    config.logger.debug(`[STORE] Completed saving into ${path}`);
  } catch (e) {
    config.logger.debug(`[STORE] Failed saving into ${path}: ${e.message}`);
  }
};
