import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from '@src/config/config';

export class SwaggerService {
  constructor(private app: INestApplication) { }

  public setupSwagger() {
    const documentConfig = new DocumentBuilder()
      .setTitle(config.docs.title)
      .setDescription(config.docs.description)
      .setVersion(config.docs.version)
      .build();
    const document = SwaggerModule.createDocument(this.app, documentConfig);
    SwaggerModule.setup(config.paths.docs.path, this.app, document);
  }
}
