import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module1Module } from './modules/module1/module1.module';
import { Module2Module } from './modules/module2/module2.module';

@Module({
  imports: [Module1Module, Module2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
