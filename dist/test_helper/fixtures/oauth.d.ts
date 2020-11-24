declare const _default: ({
    endpoint: string;
    method: string;
    request: {
        grant_type: string;
        code: string;
    };
    response: {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
        created_at: number;
        status?: undefined;
        body?: undefined;
        resource_owner_id?: undefined;
        application?: undefined;
    };
} | {
    endpoint: string;
    method: string;
    request: {
        grant_type: string;
        code: string;
    };
    response: {
        status: number;
        body: {
            error: string;
            error_description: string;
        };
        access_token?: undefined;
        token_type?: undefined;
        expires_in?: undefined;
        refresh_token?: undefined;
        scope?: undefined;
        created_at?: undefined;
        resource_owner_id?: undefined;
        application?: undefined;
    };
} | {
    endpoint: string;
    method: string;
    request: {
        grant_type: string;
        code?: undefined;
    };
    response: {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
        created_at: number;
        status?: undefined;
        body?: undefined;
        resource_owner_id?: undefined;
        application?: undefined;
    };
} | {
    endpoint: string;
    response: {
        resource_owner_id: number;
        scope: string[];
        expires_in: number;
        application: {
            uid: string;
        };
        access_token?: undefined;
        token_type?: undefined;
        refresh_token?: undefined;
        created_at?: undefined;
        status?: undefined;
        body?: undefined;
    };
    method?: undefined;
    request?: undefined;
})[];
export default _default;
