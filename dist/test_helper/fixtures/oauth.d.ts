declare const _default: ({
    endpoint: string;
    method: string;
    request: {
        code: string;
        grant_type: string;
        refresh_token?: undefined;
    };
    response: {
        access_token: string;
        created_at: number;
        expires_in: number;
        refresh_token: string;
        scope: string;
        token_type: string;
        body?: undefined;
        status?: undefined;
        application?: undefined;
        resource_owner_id?: undefined;
    };
} | {
    endpoint: string;
    method: string;
    request: {
        grant_type: string;
        refresh_token: string;
        code?: undefined;
    };
    response: {
        access_token: string;
        created_at: number;
        expires_in: number;
        refresh_token: string;
        scope: string;
        token_type: string;
        body?: undefined;
        status?: undefined;
        application?: undefined;
        resource_owner_id?: undefined;
    };
} | {
    endpoint: string;
    method: string;
    request: {
        code: string;
        grant_type: string;
        refresh_token?: undefined;
    };
    response: {
        body: {
            error: string;
            error_description: string;
        };
        status: number;
        access_token?: undefined;
        created_at?: undefined;
        expires_in?: undefined;
        refresh_token?: undefined;
        scope?: undefined;
        token_type?: undefined;
        application?: undefined;
        resource_owner_id?: undefined;
    };
} | {
    endpoint: string;
    method: string;
    request: {
        grant_type: string;
        code?: undefined;
        refresh_token?: undefined;
    };
    response: {
        access_token: string;
        created_at: number;
        expires_in: number;
        refresh_token: string;
        scope: string;
        token_type: string;
        body?: undefined;
        status?: undefined;
        application?: undefined;
        resource_owner_id?: undefined;
    };
} | {
    endpoint: string;
    response: {
        application: {
            uid: string;
        };
        expires_in: number;
        resource_owner_id: number;
        scope: string[];
        access_token?: undefined;
        created_at?: undefined;
        refresh_token?: undefined;
        token_type?: undefined;
        body?: undefined;
        status?: undefined;
    };
    method?: undefined;
    request?: undefined;
})[];
export default _default;
