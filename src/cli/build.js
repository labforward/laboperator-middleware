const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = (argv) => {
  const dockerfile = path.resolve(__dirname, '../../Dockerfile');
  const [head, tail = 'develop'] = argv.tag.split(':');

  if (!fs.existsSync('./build')) fs.mkdirSync('./build');

  execSync(`docker build -t ${head}:${tail} --file ${dockerfile} .`, {
    stdio: 'inherit',
  });
  execSync(`docker save -o build/${head}-${tail}.tar ${head}:${tail}`, {
    stdio: 'inherit',
  });
};
