import { NextFunction, Request, RequestHandler, Response } from 'express';

export default (callback: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
): Promise<void> => callback(...args).catch(args[2]);
