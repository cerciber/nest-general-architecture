import { Module } from '@nestjs/common';
import { FakeApiController } from './controllers/fake-api/fake-api.controller';

@Module({
  controllers: [FakeApiController]
})
export class FakeApiModule {}
