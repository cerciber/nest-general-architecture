import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountResponseDto } from '../../dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { IdDto } from '@src/dtos/id.dto';
import { endpointDescribe } from '@test/utils/endpoint-describe';
import { AccountDto, AccountIdNoPasswordDto } from '../../dtos/account.dto';

const createAccountData: AccountDto = {
  username: global.testEnviroment.nonValidTestClientUser.username,
  password: global.testEnviroment.testAccountPassword,
  role: statics.constants.roles.client,
  accountInfo: {
    email:
      global.testEnviroment.nonValidTestClientUser.accountInfo?.email ?? '',
    name: global.testEnviroment.nonValidTestClientUser.accountInfo?.name ?? '',
    phone:
      global.testEnviroment.nonValidTestClientUser.accountInfo?.phone ?? '',
  },
};
let createdAccount: AccountIdNoPasswordDto;

endpointDescribe(
  statics.paths.accounts.subpaths.accountsDelete,
  (endpointIt) => {
    beforeAll(async () => {
      createdAccount =
        await global.testEnviroment.accountsService.create(createAccountData);
    });

    endpointIt<IdDto, object, AccountResponseDto>({
      input: () => ({
        params: {
          _id: createdAccount._id,
        },
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.OK,
        OutputClass: AccountResponseDto,
      }),
    });

    endpointIt<IdDto, object, ErrorResponseDto>({
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

    endpointIt<IdDto, object, ErrorResponseDto>({
      input: () => ({
        params: {
          _id: global.testEnviroment.nonValidTestAdminUser._id,
        },
        token: global.testEnviroment.validTestClientToken,
      }),
      output: () => ({
        statusCode: HttpStatus.UNAUTHORIZED,
        OutputClass: ErrorResponseDto,
      }),
    });
  },
);
