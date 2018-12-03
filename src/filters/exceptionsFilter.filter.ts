import { ArgumentsHost, Catch, Inject, HttpServer, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  // This is to make the implementation 'compatible' with the base class
  private static _innerLogger: Logger = new Logger('ExceptionsHandler');

  public constructor(@Inject(HTTP_SERVER_REF) application: HttpServer) {
    super(application);
  }

  public catch(exception: Error, host: ArgumentsHost): void {
    if (exception instanceof HttpException) {
      AllExceptionsFilter._innerLogger.error(exception.message, exception.stack);
    }
    super.catch(exception, host);
  }
}