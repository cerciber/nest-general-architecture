import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [],
})
export class TestModule {}
