import { Module } from '@nestjs/common';
import { TestModule } from '@src/modules/api/modules/test/test.module';
import { NotFoundModule } from '@src/modules/not-found/not-found.module';
import { FakeApiModule } from '@src/modules/api/modules/fake-api/fake-api.module';
import { ApiController } from './api.controller';

@Module({
  imports: [
    TestModule,
    FakeApiModule,
    NotFoundModule,
  ],
  controllers: [ApiController],
})
export class ApiModule { }
