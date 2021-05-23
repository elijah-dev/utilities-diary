import { Request, Response, NextFunction } from 'express';
import { ExpressMiddleware } from './middleware.types';

export const rejectionHandler =
    (callback: ExpressMiddleware) =>
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(callback(req, res, next)).catch(next);
    };
