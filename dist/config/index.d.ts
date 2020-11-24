/// <reference types="node" />
import { Url } from 'url';
import logger, { Logger } from './logger';
interface UrlWithOrigin extends Url {
    origin: string;
}
interface Config {
    providers: {
        [provider: string]: {
            url: UrlWithOrigin;
            authentication: {
                token: {
                    url: string;
                    options: Record<string, string>;
                    serializer: string;
                };
                tokenInfo: {
                    url: string;
                };
            };
        };
    };
    logger: Logger;
}
declare const config: Config;
export { logger };
export default config;
