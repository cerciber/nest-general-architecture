import { Module } from '@nestjs/common';
import { FakeApiController } from './fake-api.controller';

@Module({
  controllers: [FakeApiController]
})
export class FakeApiModule { }
