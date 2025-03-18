import { applyDecorators, HttpStatus, RequestMapping } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { Path } from '@src/common/statics/paths/paths';
import { replacePlaceholders } from '../utils/replace-placeholders';
import { statics } from '@src/common/statics/statics';

function getRolesString(path: Path): string {
  return (
    path.roles.length ? path.roles : [statics.docs.messages.notRolesRequired]
  ).join(', ');
}

function buildApiResponses(
  path: Path,
  apiResponses: ApiResponseOptions[],
): ApiResponseOptions[] {
  return [
    ...apiResponses,
    ...(path.roles.length
      ? [
          {
            status: HttpStatus.UNAUTHORIZED,
            type: ErrorResponseDto,
          },
        ]
      : []),
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      type: ErrorResponseDto,
    },
  ];
}

function statusToNumber(status: number | string | undefined): number {
  if (typeof status === 'number') {
    return status;
  } else {
    return 500;
  }
}

function getRequestMappingDecorators(path: Path): MethodDecorator[] {
  return [
    RequestMapping({
      path: path.path,
      method: path.method,
    }),
  ];
}

function getApiBearerAuthDecorators(path: Path): MethodDecorator[] {
  return path.roles.length ? [ApiBearerAuth()] : [];
}

function getApiResponseDecorators(
  apiResponseBuild: ApiResponseOptions[],
): MethodDecorator[] {
  return apiResponseBuild.map((apiResponse) => {
    return ApiResponse({
      ...apiResponse,
      description:
        statics.docs.statusCodes[statusToNumber(apiResponse.status)] || '',
    });
  });
}

function getApiOperationDecorators(
  path: Path,
  roles: string,
): MethodDecorator[] {
  return [
    ApiOperation({
      summary: `[${roles}] ${path.summary}`,
      description: replacePlaceholders(statics.docs.messages.allowedRoles, [
        roles,
      ]),
    }),
  ];
}

function applyCustomDecorators(
  path: Path,
  apiResponseBuild: ApiResponseOptions[],
  roles: string,
): MethodDecorator {
  return applyDecorators(
    ...getRequestMappingDecorators(path),
    ...getApiBearerAuthDecorators(path),
    ...getApiResponseDecorators(apiResponseBuild),
    ...getApiOperationDecorators(path, roles),
  );
}

export function EndpointConfig({
  path,
  apiResponses,
}: {
  path: Path;
  apiResponses: ApiResponseOptions[];
}): MethodDecorator {
  const roles = getRolesString(path);
  const apiResponseBuild = buildApiResponses(path, apiResponses);
  return applyCustomDecorators(path, apiResponseBuild, roles);
}
