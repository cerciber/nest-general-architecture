import { Module } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { AppService } from '@src/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response/response.interceptor';
import { TestModule } from './modules/test/test.module';
import { NotFoundModule } from './modules/notFound/notFound.module';
@Module({
  imports: [TestModule, NotFoundModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
