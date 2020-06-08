const args = require('./args');
const server = require('./server');
const init = require('./init');
const test = require('./test');

args({ server, init, test });
