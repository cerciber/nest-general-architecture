import { Path } from '@src/common/statics/paths/paths';
import { statics } from '@src/common/statics/statics';

export function getItMessage(
  path: Path,
  statusCode: number,
  DtoToUse: any,
): string {
  return `[${statics.docs.httpMethods[path.method as keyof typeof statics.docs.httpMethods]}] ${path.path} with ${statics.docs.statusCodes[statusCode]} status and ${DtoToUse.name} response.`;
}
