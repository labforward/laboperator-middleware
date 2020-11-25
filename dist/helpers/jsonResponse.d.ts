interface JsonResponse<T> {
    status: string;
    code: string | number;
    details: T;
}
declare const _default: (code: string | number, details?: string) => JsonResponse<string>;
export default _default;
