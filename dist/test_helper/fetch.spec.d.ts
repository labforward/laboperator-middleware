declare type MockResponseBody = any;
interface Fixture {
    endpoint: string;
    method?: string;
    request?: any;
    response: MockResponseBody | {
        status: number;
        headers: Record<string, string>;
        body: MockResponseBody;
    };
}
export declare const addFixtures: (provider: string, fixtures: Array<Fixture>) => void;
export {};
