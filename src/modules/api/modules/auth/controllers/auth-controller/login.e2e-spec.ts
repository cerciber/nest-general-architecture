import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { TokenResponseDto } from '@src/modules/api/modules/auth/dtos/token-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AccountUsernameAndPasswordDto } from '@src/modules/api/modules/accounts/dtos/account.dto';
import { endpointDescribe } from '@test/utils/endpoint-describe';

endpointDescribe(statics.paths.auth.subpaths.authLogin, (endpointIt) => {
  endpointIt<object, AccountUsernameAndPasswordDto, TokenResponseDto>({
    input: () => ({
      data: {
        username: global.testEnviroment.validTestAdminUser.username,
        password: global.testEnviroment.testAccountPassword,
      },
    }),
    output: () => ({
      statusCode: HttpStatus.OK,
      OutputClass: TokenResponseDto,
    }),
  });

  endpointIt<object, AccountUsernameAndPasswordDto, ErrorResponseDto>({
    input: () => ({
      data: {
        username: '',
        password: '',
      },
    }),
    output: () => ({
      statusCode: HttpStatus.BAD_REQUEST,
      OutputClass: ErrorResponseDto,
    }),
  });

  endpointIt<object, AccountUsernameAndPasswordDto, ErrorResponseDto>({
    input: () => ({
      data: {
        username: global.testEnviroment.nonValidTestAdminUser.username,
        password: global.testEnviroment.testAccountPassword,
      },
    }),
    output: () => ({
      statusCode: HttpStatus.NOT_FOUND,
      OutputClass: ErrorResponseDto,
    }),
  });

  endpointIt<object, AccountUsernameAndPasswordDto, ErrorResponseDto>({
    input: () => ({
      data: {
        username: global.testEnviroment.validTestAdminUser.username,
        password: global.testEnviroment.testInvalidAccountPassword,
      },
    }),
    output: () => ({
      statusCode: HttpStatus.UNAUTHORIZED,
      OutputClass: ErrorResponseDto,
    }),
  });
});
