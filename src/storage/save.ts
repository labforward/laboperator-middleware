import fs from 'fs';

import config from '~/config';

export default (path: string) =>
  (data: Parameters<JSON['stringify']>[0]): void => {
    try {
      config.logger.debug(`[STORE] Started saving into ${path}`);

      fs.writeFileSync(path, JSON.stringify(data));

      config.logger.debug(`[STORE] Completed saving into ${path}`);
    } catch (e) {
      config.logger.debug(
        `[STORE] Failed saving into ${path}: ${(e as Error).message}`,
      );
    }
  };
