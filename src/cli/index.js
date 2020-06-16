const args = require('./args');
const build = require('./build');
const init = require('./init');
const server = require('./server');
const test = require('./test');

args({ server, init, test, build });
