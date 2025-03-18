import { HttpStatus } from '@nestjs/common';
import { AccountsService } from '../../services/accounts.service';
import { statics } from '@src/common/statics/statics';
import { AccountResponseDto } from '../../dtos/account-response.dto';
import { IdDto } from '@src/dtos/id.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';

export const findByIdConfig = {
  path: statics.paths.accounts.subpaths.accountsGetOne,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: AccountResponseDto,
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

export async function findById(
  accountService: AccountsService,
  params: IdDto,
): Promise<AccountResponseDto> {
  const account = await accountService.findById(params._id);
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.accounts.findOne,
    body: account,
  };
}
