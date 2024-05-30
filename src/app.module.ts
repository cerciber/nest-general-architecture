import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ConfigService } from '@src/common/services/config/config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
