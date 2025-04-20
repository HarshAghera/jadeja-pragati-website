import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const messages =
      typeof message === 'string'
        ? [message]
        : Array.isArray((message as any)?.message)
          ? (message as any).message
          : [(message as any)?.message || 'Internal server error'];

    response.status(status).json({
      data: {},
      error: true,
      messages,
    });
  }
}
