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
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        const target = (exception.meta as any)?.target?.join(', ') || 'field';
        const model = (exception.meta as any)?.modelName || 'model';
        message = `A ${model.toLowerCase()} with that ${target} already exists.`;
      }

      return response.status(status).json({
        statusCode: status,
        message,
        path: request.url,
      });
    }

    // If it's a validation error (e.g., bad input), send a structured response
    if (status === 400) {
      return response
        .status(status)
        .json({
          statusCode: status,
          message: 'Bad request, validation failed',
          errors: exception.response?.message || exception.message,
          path: request.url,
        });
    }

    // General error handling (for unexpected cases)
    return response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message || 'Internal server error',
        path: request.url,
      });
  }
}
