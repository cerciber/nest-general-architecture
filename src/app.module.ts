import { Module } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { AppService } from '@src/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response/response.interceptor';
import { PathNoFoundController } from '@src/controllers/pathNoFound.controller';
import { TestModule } from './modules/test/test.module';
@Module({
  imports: [TestModule],
  controllers: [AppController, PathNoFoundController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
