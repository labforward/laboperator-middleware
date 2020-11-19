import load from './load';
import pathFor from './pathFor';
import save from './save';

export default (key) => {
  const path = pathFor(key);

  return {
    load: load(path),
    save: save(path),
  };
};
