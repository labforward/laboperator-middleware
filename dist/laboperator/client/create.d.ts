import { Authentication } from '~/helpers/authentication';
export interface LaboperatorClient {
    authentication: Authentication;
    apis: any;
    errors: Array<string>;
    spec: {
        servers: Array<{
            url: string | null;
        }>;
    };
}
declare const _default: () => Promise<LaboperatorClient>;
export default _default;
