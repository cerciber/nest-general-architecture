import { Account } from '@src/modules/mongo/schemas/account.schema';
import { DeleteResult, Model } from 'mongoose';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';

async function deleteAllAccounts(
  accountModel: Model<Account>,
): Promise<DeleteResult> {
  return accountModel.deleteMany({});
}

async function deleteAllAccountsInfo(
  accountInfoModel: Model<AccountInfo>,
): Promise<DeleteResult> {
  return accountInfoModel.deleteMany({});
}

export async function deleteAll(
  accountModel: Model<Account>,
  accountInfoModel: Model<AccountInfo>,
): Promise<void> {
  await deleteAllAccounts(accountModel);
  await deleteAllAccountsInfo(accountInfoModel);
}
