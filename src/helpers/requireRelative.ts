import path from 'path';

// relative to working directory, so that each specialized middleware
// can inject their customization
// eslint-disable-next-line import/no-dynamic-require
export default (name) => require(path.resolve(name));
