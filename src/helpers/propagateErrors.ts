import { NextFunction, Request, RequestHandler, Response } from 'express';

export default (callback: RequestHandler) =>
  (...args: [Request, Response, NextFunction]): Promise<void> =>
    (callback(...args) as unknown as Promise<void>).catch(args[2]);
