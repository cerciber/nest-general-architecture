import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountsResponseDto } from '../../dtos/account-response.dto';
import { endpointDescribe } from '@test/utils/endpoint-describe';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';

endpointDescribe(statics.paths.accounts.subpaths.accountsGet, (endpointIt) => {
  endpointIt<object, object, AccountsResponseDto>({
    input: () => ({
      token: global.testEnviroment.validTestAdminToken,
    }),
    output: () => ({
      statusCode: HttpStatus.OK,
      OutputClass: AccountsResponseDto,
    }),
  });

  endpointIt<object, object, ErrorResponseDto>({
    input: () => ({
      token: global.testEnviroment.validTestClientToken,
    }),
    output: () => ({
      statusCode: HttpStatus.UNAUTHORIZED,
      OutputClass: ErrorResponseDto,
    }),
  });
});
