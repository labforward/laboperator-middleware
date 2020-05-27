const path = require('path');

// relative to working directory, so that each specialized middleware
// can inject their customization
// eslint-disable-next-line import/no-dynamic-require
module.exports = (name) => require(path.resolve(name));
