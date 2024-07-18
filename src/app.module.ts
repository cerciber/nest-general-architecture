import { Module } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { AppService } from '@src/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response/response.interceptor';
import { TestModule } from '@src/modules/test/test.module';
import { NotFoundModule } from '@src/modules/notFound/notFound.module';
import { ConfigModule } from '@nestjs/config';
import { constants } from './config/constants/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: constants.envs.envFilePath,
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
export class AppModule { }
