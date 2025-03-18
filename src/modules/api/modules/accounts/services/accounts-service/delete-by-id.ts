import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountIdNoPasswordDto, AccountNames } from '../../dtos/account.dto';
import { DeleteResult, Model } from 'mongoose';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { ResponseError } from '@src/common/exceptions/response-error';

async function findAccountToDelete(
  accountModel: Model<Account>,
  _id: string,
): Promise<Account | null> {
  return accountModel
    .findOne({ _id })
    .populate({ path: AccountNames.accountInfo })
    .exec();
}

async function deleteAccount(
  accountModel: Model<Account>,
  _id: string,
): Promise<DeleteResult> {
  return accountModel.deleteOne({ _id }).exec();
}

async function deleteAccountInfo(
  accountInfoModel: Model<AccountInfo>,
  _id: string,
): Promise<DeleteResult> {
  return accountInfoModel.deleteOne({ account: _id }).exec();
}

async function notAccountError(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.NOT_FOUND,
    code: statics.codes.noDataFound.code,
    message: statics.codes.noDataFound.message,
    detail: statics.messages.accounts.notFound,
  });
}

function mapToDto(account: Account): AccountIdNoPasswordDto {
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

export async function deleteById(
  accountModel: Model<Account>,
  accountInfoModel: Model<AccountInfo>,
  _id: string,
): Promise<AccountIdNoPasswordDto> {
  const accountToDelete = await findAccountToDelete(accountModel, _id);
  if (!accountToDelete) throw await notAccountError();
  await deleteAccount(accountModel, _id);
  await deleteAccountInfo(accountInfoModel, _id);
  return mapToDto(accountToDelete);
}
