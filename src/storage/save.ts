import fs from 'fs';

import config from '~/config';

export default (path) => (data) => {
  try {
    config.logger.debug(`[STORE] Started saving into ${path}`);

    fs.writeFileSync(path, JSON.stringify(data));

    config.logger.debug(`[STORE] Completed saving into ${path}`);
  } catch (e) {
    config.logger.debug(`[STORE] Failed saving into ${path}: ${e.message}`);
  }
};
