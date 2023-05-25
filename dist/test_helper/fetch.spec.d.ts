type MockResponseBody = any;
interface Fixture {
    endpoint: string;
    method?: string;
    request?: any;
    response: MockResponseBody | {
        body: MockResponseBody;
        headers: Record<string, string>;
        status: number;
    };
}
export declare const addFixtures: (provider: string, fixtures: Array<Fixture>) => void;
export {};
