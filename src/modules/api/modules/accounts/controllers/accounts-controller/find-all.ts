import { HttpStatus } from '@nestjs/common';
import { AccountsService } from '../../services/accounts.service';
import { statics } from '@src/common/statics/statics';
import { AccountsResponseDto } from '../../dtos/account-response.dto';

export const findAllConfig = {
  path: statics.paths.accounts.subpaths.accountsGet,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: AccountsResponseDto,
    },
  ],
};

export async function findAll(
  accountService: AccountsService,
): Promise<AccountsResponseDto> {
  const accounts = await accountService.findAll();
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.accounts.findAll,
    body: accounts,
  };
}
