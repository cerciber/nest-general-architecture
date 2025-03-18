import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountIdNoPasswordDto, AccountNames } from '../../dtos/account.dto';
import { Model } from 'mongoose';

async function findAllWithInfo(
  accountModel: Model<Account>,
): Promise<Account[]> {
  return accountModel
    .find()
    .populate({ path: AccountNames.accountInfo })
    .exec();
}

async function modelToDto(
  accounts: Account[],
): Promise<AccountIdNoPasswordDto[]> {
  return accounts.map((account: Account) => ({
    _id: account._id.toString(),
    username: account.username,
    role: account.role,
    accountInfo: account.accountInfo
      ? {
          _id: account.accountInfo._id.toString(),
          account: account.accountInfo.account.toString(),
          name: account.accountInfo.name,
          email: account.accountInfo.email,
          phone: account.accountInfo.phone,
        }
      : undefined,
  }));
}

export async function findAll(
  accountModel: Model<Account>,
): Promise<AccountIdNoPasswordDto[]> {
  const accounts = await findAllWithInfo(accountModel);
  return modelToDto(accounts);
}
