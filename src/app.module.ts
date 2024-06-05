import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ConfigService } from '@src/common/services/config/config.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { ErrorHandlerFilter } from './common/exceptions/errorHandlerFilter/errorHandlerFilter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: ErrorHandlerFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
