const yargs = require('yargs');

yargs
  .option('port', {
    alias: 'p',
    default: 6000,
    description: 'Which port to listen to.',
    type: 'number',
  })
  .option('watch', {
    alias: 'w',
    default: false,
    description: 'Watch for changes and automatically reload server.',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h');

module.exports = yargs.argv;
