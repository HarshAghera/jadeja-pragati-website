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

    let messages: string[] = ['Internal server error'];

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        messages = [res];
      } else if (typeof res === 'object' && res !== null) {
        const msg = (res as { message?: string | string[] }).message;
        if (Array.isArray(msg)) {
          messages = msg;
        } else if (typeof msg === 'string') {
          messages = [msg];
        }
      }
    }

    response.status(status).json({
      value: {},
      error: true,
      messages,
    });
  }
}
