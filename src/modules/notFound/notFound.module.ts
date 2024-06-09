import { Module } from '@nestjs/common';
import { NotFoundController } from './controllers/notFound.controller';

@Module({
  imports: [],
  controllers: [NotFoundController],
  providers: [],
})
export class NotFoundModule {}
