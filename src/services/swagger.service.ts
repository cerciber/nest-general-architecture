import { INestApplication } from '@nestjs/common';
import { setupSwagger } from './swager-service/setup-swagger';

export class SwaggerService {
  constructor(private readonly app: INestApplication) {}

  public async setupSwagger(): Promise<void> {
    return setupSwagger(this.app);
  }
}
