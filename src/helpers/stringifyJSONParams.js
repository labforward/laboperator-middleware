const snakeCaseKeys = require('snakecase-keys');

module.exports = (params) =>
  JSON.stringify(snakeCaseKeys(params, { deep: true }));
