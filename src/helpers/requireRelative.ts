import path from 'path';

// relative to working directory, so that each specialized middleware
// can inject their customization
export default (name: string): ReturnType<NodeRequire> =>
  // eslint-disable-next-line import/no-dynamic-require
  require(path.resolve(name));
