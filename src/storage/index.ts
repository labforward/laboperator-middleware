import load from './load';
import pathFor from './pathFor';
import save from './save';

interface Storage {
  load: ReturnType<typeof load>;
  save: ReturnType<typeof save>;
}

export default (key: string): Storage => {
  const path = pathFor(key);

  return {
    load: load(path),
    save: save(path),
  };
};
