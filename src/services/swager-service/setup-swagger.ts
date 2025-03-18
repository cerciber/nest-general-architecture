import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { statics } from '@src/common/statics/statics';

async function createDocumentConfig(): Promise<Omit<OpenAPIObject, 'paths'>> {
  return new DocumentBuilder()
    .setTitle(statics.docs.title)
    .setDescription(statics.docs.description)
    .setVersion(statics.docs.version)
    .addBearerAuth()
    .build();
}

async function createDocument(
  app: INestApplication,
  documentConfig: Omit<OpenAPIObject, 'paths'>,
): Promise<OpenAPIObject> {
  return SwaggerModule.createDocument(app, documentConfig);
}

async function setup(
  app: INestApplication,
  document: OpenAPIObject,
): Promise<void> {
  return SwaggerModule.setup(statics.paths.docs.path, app, document, {
    customSiteTitle: statics.docs.title,
  });
}

export async function setupSwagger(app: INestApplication): Promise<void> {
  const documentConfig = await createDocumentConfig();
  const document = await createDocument(app, documentConfig);
  await setup(app, document);
}
