import { Module } from '@nestjs/common';
import { MongoModule } from '@src/modules/mongo/mongo.module';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [MongoModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
