import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountResponseDto } from '../../dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { IdDto } from '@src/dtos/id.dto';
import { endpointDescribe } from '@test/utils/endpoint-describe';

endpointDescribe(
  statics.paths.accounts.subpaths.accountsGetOne,
  (endpointIt) => {
    endpointIt<IdDto, object, AccountResponseDto>({
      input: () => ({
        params: {
          _id: global.testEnviroment.validTestAdminUser._id,
        },
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.OK,
        OutputClass: AccountResponseDto,
      }),
    });

    endpointIt<object, IdDto, ErrorResponseDto>({
      input: () => ({
        params: {
          _id: 'invalid-id',
        },
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.BAD_REQUEST,
        OutputClass: ErrorResponseDto,
      }),
    });

    endpointIt<IdDto, object, ErrorResponseDto>({
      input: () => ({
        params: {
          _id: global.testEnviroment.nonValidTestAdminUser._id,
        },
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.NOT_FOUND,
        OutputClass: ErrorResponseDto,
      }),
    });
  },
);
