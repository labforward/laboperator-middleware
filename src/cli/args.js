const yargs = require('yargs');

const serverOption = (command) =>
  command
    .option('port', {
      alias: 'p',
      default: 8000,
      description: 'Which port to listen to.',
      type: 'number',
    })
    .option('watch', {
      alias: 'w',
      default: false,
      description: 'Watch for changes and automatically reload server.',
      type: 'boolean',
    });

yargs
  .command('server', 'Start the server', serverOption)
  .command('init', 'Initialize a new middleware')
  .alias('server', 's')
  .help()
  .alias('help', 'h');

module.exports = ({ server, init }) => {
  const { argv } = yargs;
  const [command] = argv._;

  switch (command) {
    case 'server': {
      server(argv);
      break;
    }
    case 'init':
      init(argv);
      break;
    default:
      yargs.showHelp();
  }
};
