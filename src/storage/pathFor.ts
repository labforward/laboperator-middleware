import fs from 'fs';
import path from 'path';

export default (key: string): string => {
  fs.mkdirSync('./storage', { recursive: true });

  return path.resolve(`./storage/${key}.json`);
};
