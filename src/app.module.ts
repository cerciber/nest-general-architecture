import { Module } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { AppService } from '@src/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response/response.interceptor';
import { TestModule } from './modules/test/test.module';
import { NotFoundModule } from './modules/notFound/notFound.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TestModule,
    NotFoundModule,
  ],
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
