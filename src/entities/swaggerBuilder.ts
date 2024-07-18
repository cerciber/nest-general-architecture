import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from '@src/config/config';

export class SwaggerBuilder {
  constructor(app: INestApplication<any>) {
    const documentConfig = new DocumentBuilder()
      .setTitle(config.docs.title)
      .setDescription(config.docs.description)
      .setVersion(config.docs.version)
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup(config.paths.docs.path, app, document);
  }
}
