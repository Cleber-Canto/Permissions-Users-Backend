import { Request, Response, NextFunction } from 'express';

interface Error {
  status?: number;
  message?: string;
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
}
