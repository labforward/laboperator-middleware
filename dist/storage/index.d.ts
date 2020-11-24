import load from './load';
import save from './save';
interface Storage {
    load: ReturnType<typeof load>;
    save: ReturnType<typeof save>;
}
declare const _default: (key: string) => Storage;
export default _default;
