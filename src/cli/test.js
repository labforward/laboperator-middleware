const path = require('path');
const _ = require('lodash');
const { execSync } = require('child_process');

module.exports = (args) => {
  const [_command, ...childArgs] = args._;
  const configFile = path.resolve(__dirname, '../../reporters.json');
  const ciArgs =
    args.ci || _.includes(childArgs, '--ci')
      ? `--no-interactive --reporter mocha-multi-reporters --reporter-options configFile=${configFile}`
      : '';

  const command = `NODE_ENV=test npx mocha src/test_helper "src/**/*.spec.js" --timeout 5000 ${ciArgs} ${childArgs.join(
    ' '
  )}`;

  console.info('\x1b[2m', command); // eslint-disable-line no-console

  execSync(command, { stdio: 'inherit' });
};
