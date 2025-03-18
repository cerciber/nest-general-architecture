import { Account } from '@src/modules/mongo/schemas/account.schema';
import { Model } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountIdDto, AccountNames } from '../../dtos/account.dto';

async function findOneAccount(
  accountModel: Model<Account>,
  username: string,
): Promise<Account | null> {
  return await accountModel
    .findOne({ username })
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

function mapAccountToDto(account: Account): AccountIdDto {
  return {
    _id: account._id.toString(),
    username: account.username,
    password: account.password,
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

export async function findByUsernameWithPassword(
  accountModel: Model<Account>,
  username: string,
): Promise<AccountIdDto> {
  const account = await findOneAccount(accountModel, username);
  if (!account) throw await notAccountError();
  return mapAccountToDto(account);
}
