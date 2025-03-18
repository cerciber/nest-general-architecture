import { HttpStatus } from '@nestjs/common';
import { AccountsService } from '../../services/accounts.service';
import { statics } from '@src/common/statics/statics';
import {
  AccountResponseDto,
  AccountsResponseDto,
} from '../../dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { PartialAccountDto } from '../../dtos/account.dto';
import { IdDto } from '@src/dtos/id.dto';

export const updateByIdConfig = {
  path: statics.paths.accounts.subpaths.accountsUpdate,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: AccountsResponseDto,
    },
    {
      status: HttpStatus.BAD_REQUEST,
      type: ErrorResponseDto,
    },
    {
      status: HttpStatus.NOT_FOUND,
      type: ErrorResponseDto,
    },
    {
      status: HttpStatus.CONFLICT,
      type: ErrorResponseDto,
    },
  ],
};

export async function updateById(
  accountService: AccountsService,
  params: IdDto,
  updateAccountRequest: PartialAccountDto,
): Promise<AccountResponseDto> {
  const updatedAccount = await accountService.updateById(
    params._id,
    updateAccountRequest,
  );
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataUpdatedSuccessfully.code,
    message: statics.codes.dataUpdatedSuccessfully.message,
    detail: statics.messages.accounts.update,
    body: updatedAccount,
  };
}
