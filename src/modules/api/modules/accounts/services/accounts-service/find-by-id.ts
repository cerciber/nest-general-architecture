import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountIdNoPasswordDto, AccountNames } from '../../dtos/account.dto';
import { Model } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';

async function findOneAccount(
  accountModel: Model<Account>,
  _id: string,
): Promise<Account | null> {
  return await accountModel
    .findOne({ _id })
    .populate({ path: AccountNames.accountInfo })
    .exec();
}

async function notAccountError(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.NOT_FOUND,
    code: statics.codes.noDataFound.code,
    message: statics.codes.noDataFound.message,
    detail: statics.messages.accounts.notFound,
  });
}

function mapAccountToDto(account: Account): AccountIdNoPasswordDto {
  return {
    _id: account._id.toString(),
    username: account.username,
    role: account.role,
    accountInfo: account.accountInfo
      ? {
          _id: account.accountInfo._id.toString(),
          account: account.accountInfo.account,
          name: account.accountInfo.name,
          email: account.accountInfo.email,
          phone: account.accountInfo.phone,
        }
      : undefined,
  };
}

export async function findById(
  accountModel: Model<Account>,
  _id: string,
): Promise<AccountIdNoPasswordDto> {
  const account = await findOneAccount(accountModel, _id);
  if (!account) throw await notAccountError();
  return mapAccountToDto(account);
}
