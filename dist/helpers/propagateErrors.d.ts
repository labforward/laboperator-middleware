import { NextFunction, Request, RequestHandler, Response } from 'express';
declare const _default: (callback: RequestHandler) => (...args: [Request, Response, NextFunction]) => Promise<void>;
export default _default;
