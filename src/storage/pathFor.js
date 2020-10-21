const fs = require('fs');
const path = require('path');

module.exports = (key) => {
  if (!fs.existsSync('./storage')) fs.mkdirSync('./storage');

  return path.resolve(`./storage/${key}.json`);
};
