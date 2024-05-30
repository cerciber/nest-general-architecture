import { Injectable } from '@nestjs/common';
import { ConfigService } from '@src/common/services/config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.constants.messages.rootText;
  }
}
