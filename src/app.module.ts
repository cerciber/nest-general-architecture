import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from '@src/controllers/app.controller';
import { ErrorService } from '@src/services/error.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@src/common/interceptors/response.interceptor';
import { TestModule } from '@src/modules/test/test.module';
import { NotFoundModule } from '@src/modules/notFound/notFound.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './services/logger.service';
import { EnvsService } from './services/envs.service';
import { DTOsService } from './services/dtos.service';
import { statics } from '@src/config/statics';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: statics.constants.envs.envFilePath,
      isGlobal: true,
    }),
    TestModule,
    NotFoundModule,
  ],
  controllers: [AppController],
  providers: [
    EnvsService,
    LoggerService,
    ErrorService,
    DTOsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [
    EnvsService,
    LoggerService,
    ErrorService,
    DTOsService
  ]
})
export class AppModule { }
