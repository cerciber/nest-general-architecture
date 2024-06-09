import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerBuilder {
  constructor(app: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle('Nest General Architecture')
      .setDescription(
        'General architecture for Nest.js with TypeScript implementing 3 Layered Architecture. Node.js.',
      )
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}
