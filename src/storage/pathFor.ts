import fs from 'fs';
import path from 'path';

export default (key) => {
  if (!fs.existsSync('./storage')) fs.mkdirSync('./storage');

  return path.resolve(`./storage/${key}.json`);
};
