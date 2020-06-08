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

const testOption = (command) =>
  command.option('ci', {
    default: false,
    description: 'Run in CI mode.',
    type: 'boolean',
  });

yargs
  .command('server', 'Start the server', serverOption)
  .command('init', 'Initialize a new middleware')
  .command('test', 'Run specs', testOption)
  .alias('server', 's')
  .help()
  .alias('help', 'h');

module.exports = ({ server, init, test }) => {
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
    case 'test':
      test(argv);
      break;
    default:
      yargs.showHelp();
  }
};
