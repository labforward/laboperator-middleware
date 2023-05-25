declare const _default: ({
    endpoint: string;
    response: {
        data: {
            id: string;
            type: string;
            attributes: {
                access_token: string;
                created_at: number;
                expires_in: number;
                provider: string;
                refresh_token: string;
                uid: string;
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
        body?: undefined;
        status?: undefined;
    };
} | {
    endpoint: string;
    response: {
        data: {
            id: string;
            type: string;
            attributes: {
                access_token: string;
                created_at: number;
                expires_in: number;
                provider: string;
                refresh_token: string;
                uid: string;
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
        body?: undefined;
        status?: undefined;
    };
} | {
    endpoint: string;
    response: {
        body: {
            errors: {
                detail: string;
                status: number;
            }[];
        };
        status: number;
        data?: undefined;
    };
})[];
export default _default;
