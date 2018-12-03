
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}