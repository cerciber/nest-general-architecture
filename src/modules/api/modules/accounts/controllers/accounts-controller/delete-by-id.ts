import { HttpStatus } from '@nestjs/common';
import { AccountsService } from '../../services/accounts.service';
import { statics } from '@src/common/statics/statics';
import {
  AccountResponseDto,
  AccountsResponseDto,
} from '../../dtos/account-response.dto';
import { IdDto } from '@src/dtos/id.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';

export const deleteByIdConfig = {
  path: statics.paths.accounts.subpaths.accountsDelete,
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
  ],
};

export async function deleteById(
  accountService: AccountsService,
  params: IdDto,
): Promise<AccountResponseDto> {
  const deletedAccount = await accountService.deleteById(params._id);
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataDeletedSuccessfully.code,
    message: statics.codes.dataDeletedSuccessfully.message,
    detail: statics.messages.accounts.delete,
    body: deletedAccount,
  };
}
