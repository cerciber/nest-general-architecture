import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest General Architecture')
    .setDescription(
      'General architecture for Nest.js with TypeScript implementing 3 Layered Architecture. Node.js.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
