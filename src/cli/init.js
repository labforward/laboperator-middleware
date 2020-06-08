/* eslint-disable no-console */
const fse = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

module.exports = async () => {
  try {
    console.log('Initializing middleware...');

    console.log('Copying boilerplate...');
    await fse.copy(path.resolve(__dirname, '../templates/init'), '.', {
      dereference: true,
    });

    console.log('Installing dependencies...');
    execSync(
      'yarn add --dev chai chai-http chai-subset dirty-chai fetch-mock eslint-plugin-mocha@^6.3.0 mocha mocha-junit-reporter mocha-multi-reporters sinon sinon-chai https://github.com/labforward/labforward-config-base',
      { stdio: 'inherit' }
    );

    console.log("Done! Don't forget to update config.yml!");
  } catch (error) {
    console.error(error);
  }
};
