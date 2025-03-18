import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountResponseDto } from '../../dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AccountDto } from '../../dtos/account.dto';
import { endpointDescribe } from '@test/utils/endpoint-describe';

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

endpointDescribe(
  statics.paths.accounts.subpaths.accountsCreate,
  (endpointIt) => {
    endpointIt<object, AccountDto, AccountResponseDto>({
      input: () => ({
        data: createAccountData,
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.CREATED,
        OutputClass: AccountResponseDto,
      }),
    });

    endpointIt<object, AccountDto, ErrorResponseDto>({
      input: () => ({
        data: {
          ...createAccountData,
          username: '',
        },
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.BAD_REQUEST,
        OutputClass: ErrorResponseDto,
      }),
    });

    endpointIt<object, AccountDto, ErrorResponseDto>({
      input: () => ({
        data: {
          ...createAccountData,
          username: global.testEnviroment.validTestClientUser.username,
        },
        token: global.testEnviroment.validTestAdminToken,
      }),
      output: () => ({
        statusCode: HttpStatus.CONFLICT,
        OutputClass: ErrorResponseDto,
      }),
    });

    endpointIt<object, AccountDto, ErrorResponseDto>({
      input: () => ({
        data: createAccountData,
        token: global.testEnviroment.validTestClientToken,
      }),
      output: () => ({
        statusCode: HttpStatus.UNAUTHORIZED,
        OutputClass: ErrorResponseDto,
      }),
    });
  },
);

afterAll(async () => {
  const account =
    await global.testEnviroment.accountsService.findByUsernameWithPassword(
      createAccountData.username,
    );
  await global.testEnviroment.accountsService.deleteById(account._id);
});
