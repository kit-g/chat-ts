import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message || 'Internal server error';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case'P2002':
          status = HttpStatus.CONFLICT;
          message = `A ${modelOf(exception)} with that ${(fieldsOf(exception))} already exists.`;
          break;
        case'P2025':
          status = HttpStatus.NOT_FOUND;
          message = `A ${modelOf(exception)} not found`;
      }

      return response.status(status).json({
        message,
        path: request.url,
      });
    }

    // If it's a validation error (e.g., bad input), send a structured response
    if (status === 400) {
      return response
        .status(status)
        .json({
          message: 'Bad request, validation failed',
          errors: exception.response?.message || exception.message,
          path: request.url,
        });
    }

    // General error handling (for unexpected cases)
    return response
      .status(status)
      .json({
        message: exception.message || 'Internal server error',
        path: request.url,
      });
  }
}

function modelOf(exception: any): string {
  return ((exception.meta as any)?.modelName || 'model').toLowerCase();
}

function fieldsOf(exception: any): string {
  return (exception.meta as any)?.target?.join(', ') || 'field';
}
