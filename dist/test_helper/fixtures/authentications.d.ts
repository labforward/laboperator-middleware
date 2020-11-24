declare const _default: ({
    endpoint: string;
    response: {
        data: {
            id: string;
            type: string;
            attributes: {
                provider: string;
                uid: string;
                access_token: string;
                expires_in: number;
                refresh_token: string;
                created_at: number;
            };
            relationships: {
                user: {
                    data: {
                        id: string;
                        type: string;
                    };
                };
            };
            links: {
                self: string;
            };
        }[];
        status?: undefined;
        body?: undefined;
    };
} | {
    endpoint: string;
    response: {
        data: {
            id: string;
            type: string;
            attributes: {
                provider: string;
                uid: string;
                access_token: string;
                expires_in: number;
                refresh_token: string;
                created_at: number;
            };
            relationships: {
                user: {
                    data: {
                        id: string;
                        type: string;
                    };
                };
            };
            links: {
                self: string;
            };
        };
        status?: undefined;
        body?: undefined;
    };
} | {
    endpoint: string;
    response: {
        status: number;
        body: {
            errors: {
                status: number;
                detail: string;
            }[];
        };
        data?: undefined;
    };
})[];
export default _default;
