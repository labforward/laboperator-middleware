export default (callback) => (...args) => callback(...args).catch(args[2]);
