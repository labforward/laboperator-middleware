module.exports = (key) => {
  const path = require('./pathFor')(key);

  return {
    load: require('./load')(path),
    save: require('./save')(path),
  };
};
