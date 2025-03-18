import { Module } from '@nestjs/common';
import { NotFoundController } from './controllers/not-found.controller';

@Module({
  imports: [],
  controllers: [NotFoundController],
  providers: [],
})
export class NotFoundModule {}
