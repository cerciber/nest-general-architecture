import { HttpStatus } from '@nestjs/common';
import { AccountsService } from '../../services/accounts.service';
import { statics } from '@src/common/statics/statics';
import { AccountResponseDto } from '../../dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AccountDto } from '../../dtos/account.dto';

export const createConfig = {
  path: statics.paths.accounts.subpaths.accountsCreate,
  apiResponses: [
    {
      status: HttpStatus.CREATED,
      type: AccountResponseDto,
    },
    {
      status: HttpStatus.BAD_REQUEST,
      type: ErrorResponseDto,
    },
    {
      status: HttpStatus.CONFLICT,
      type: ErrorResponseDto,
    },
  ],
};

export async function create(
  accountService: AccountsService,
  account: AccountDto,
): Promise<AccountResponseDto> {
  const createdAccount = await accountService.create(account);
  return {
    status: HttpStatus.CREATED,
    code: statics.codes.dataSavedSuccessfully.code,
    message: statics.codes.dataSavedSuccessfully.message,
    detail: statics.messages.accounts.create,
    body: createdAccount,
  };
}
