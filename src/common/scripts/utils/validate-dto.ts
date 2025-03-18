import { INestApplicationContext } from '@nestjs/common';
import { LaunchError } from '@src/common/exceptions/launch-error';
import { DTOsService } from '@src/services/dtos.service';
import { statics } from '@src/common/statics/statics';

export async function validateDto(
  app: INestApplicationContext,
  data: any,
  metatype: any,
): Promise<void> {
  const validationPipe = await app.get(DTOsService).validationPipe();
  try {
    await validationPipe.transform(data, {
      type: 'body',
      metatype: metatype,
    });
  } catch (error: any) {
    throw new LaunchError(
      statics.codes.startError.code,
      statics.messages.default.validationError,
      `${error?.response?.message} ${JSON.stringify(data)}`,
    );
  }
}
