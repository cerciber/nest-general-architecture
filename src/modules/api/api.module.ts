import { Module } from '@nestjs/common';
//import { TestModule } from '@src/modules/api/modules/test/test.module';
import { AccountsModule } from '@src/modules/api/modules/accounts/accounts.module';
import { ApiController } from './api.controller';

@Module({
  imports: [
    //TestModule,
    AccountsModule,
  ],
  controllers: [ApiController],
})
export class ApiModule { }
