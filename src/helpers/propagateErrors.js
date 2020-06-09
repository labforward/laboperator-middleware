module.exports = (callback) => (...args) => callback(...args).catch(args[2]);
