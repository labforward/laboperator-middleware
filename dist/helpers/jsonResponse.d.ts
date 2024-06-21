interface JsonResponse<T> {
    code: string | number;
    details: T;
    status: string;
}
declare const _default: (code: string | number, details?: string) => JsonResponse<typeof details>;
export default _default;
