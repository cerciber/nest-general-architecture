import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ConfigService } from '@src/common/services/config/config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response/response.interceptor';
import { PathNoFoundController } from '@src/common/controllers/PathNoFound/pathNoFound.controller';
@Module({
  imports: [],
  controllers: [AppController, PathNoFoundController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
