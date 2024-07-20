import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { HandlerErrorService } from '@src/services/handlerError.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response.interceptor';
import { TestModule } from '@src/modules/test/test.module';
import { NotFoundModule } from '@src/modules/notFound/notFound.module';
import { ConfigModule } from '@nestjs/config';
import { constants } from './config/constants/constants';
import { LoggerService } from './services/logger.service';
import { EnvsConfigService } from './services/envsConfig.service';
import { DTOsConfigService } from './services/dtosConfig.service';

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
    EnvsConfigService,
    LoggerService,
    HandlerErrorService,
    DTOsConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [
    EnvsConfigService,
    LoggerService,
    HandlerErrorService,
    DTOsConfigService
  ]
})
export class AppModule { }
