import { Url } from 'url';
import logger, { Logger } from './logger';
interface UrlWithOrigin extends Url {
    origin: string;
}
interface Config {
    logger: Logger;
    providers: {
        [provider: string]: {
            authentication: {
                token: {
                    options: Record<string, string>;
                    serializer: string;
                    url: string;
                };
                tokenInfo: {
                    url: string;
                };
            };
            url: UrlWithOrigin;
        };
    };
}
declare const config: Config;
export { logger };
export default config;
