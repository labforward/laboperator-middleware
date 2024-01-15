import fs from 'fs';

import config from '~/config';

export default (path: string): ReturnType<JSON['parse']> =>
  () => {
    if (!fs.existsSync(path)) return undefined;

    let data;

    try {
      config.logger.debug(`[STORE] Started loading from ${path}`);

      data = JSON.parse(fs.readFileSync(path).toString());

      config.logger.debug(`[STORE] Completed loading from ${path}`);
    } catch (e) {
      config.logger.debug(
        `[STORE] Failed loading from ${path}: ${(e as Error).message}`,
      );
    }

    return data;
  };
