/// <reference types="qs" />
import { NextFunction, Request, RequestHandler, Response } from 'express';
declare const _default: (callback: RequestHandler) => (args_0: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, args_1: Response<any>, args_2: NextFunction) => Promise<void>;
export default _default;
