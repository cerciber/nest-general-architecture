import { validateOrReject } from 'class-validator';
import * as request from 'supertest';
import { Path } from '@src/common/statics/paths/paths';
import { statics } from '@src/common/statics/statics';
import { HttpStatus } from '@nestjs/common';

export async function validateResponse<ParamsType, InputType, OutputType>(
  {
    path,
    statusCode,
    input,
    token,
    params,
  }: {
    path: Path;
    statusCode: HttpStatus;
    input?: InputType;
    token?: string;
    params?: ParamsType;
  },
  OutputClass: any,
): Promise<OutputType> {
  const pathWithParams = applyParamsToPath(
    path,
    params as { [key: string]: string },
  );
  const response = await (
    request(global.testEnviroment.app.getHttpServer()) as any
  )
    [
      statics.docs.httpMethods[
        path.method as keyof typeof statics.docs.httpMethods
      ].toLocaleLowerCase()
    ](pathWithParams)
    .set('Authorization', `Bearer ${token}`)
    .send(input)
    .expect(statusCode);
  const responseBody = response.body;
  const dto = Object.assign(new OutputClass(), responseBody);
  try {
    await validateOrReject(dto);
    return responseBody;
  } catch (error) {
    throw error;
  }
}

function applyParamsToPath(
  path: Path,
  params?: { [key: string]: string },
): string {
  if (!params) return path.path;
  return path.path.replace(/:([a-zA-Z0-9_]+)/g, (match, p1) => {
    return params[p1] || match;
  });
}
