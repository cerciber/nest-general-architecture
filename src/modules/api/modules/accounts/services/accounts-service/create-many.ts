import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountDto, AccountIdNoPasswordDto } from '../../dtos/account.dto';
import { Model } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { hashSync } from 'bcrypt';
import { replacePlaceholders } from '@src/common/utils/replace-placeholders';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';

async function encryptPasswords(
  createAccountsDto: AccountDto[],
): Promise<AccountDto[]> {
  return createAccountsDto.map((createAccountDto) => ({
    ...createAccountDto,
    password: hashSync(
      createAccountDto.password,
      statics.constants.bcrypt.saltRounds,
    ),
  }));
}

async function saveMany(
  accountModel: Model<Account>,
  encryptAccountsDto: AccountDto[],
): Promise<Account[]> {
  return Promise.all(
    encryptAccountsDto.map((encryptAccountDto) =>
      new accountModel(encryptAccountDto).save(),
    ),
  );
}

async function createInfoMany(
  accountInfoModel: Model<AccountInfo>,
  createAccountsDto: AccountDto[],
  createdAccounts: Account[],
): Promise<AccountInfo[]> {
  return Promise.all(
    createAccountsDto.map((createAccountDto, index) =>
      new accountInfoModel({
        account: createdAccounts[index]?._id,
        name: createAccountDto.accountInfo.name,
        email: createAccountDto.accountInfo.email,
        phone: createAccountDto.accountInfo.phone,
      }).save(),
    ),
  );
}

async function updateAccountInfoIdOnAccounts(
  accountModel: Model<Account>,
  createdAccounts: Account[],
  createdAccountInfos: AccountInfo[],
): Promise<void> {
  await Promise.all(
    createdAccounts.map((createdAccount, index) =>
      accountModel.findByIdAndUpdate(createdAccount._id, {
        accountInfo: createdAccountInfos[index]?._id,
      }),
    ),
  );
}

async function modelToDtoMany(
  createdAccounts: Account[],
  createdAccountInfos: AccountInfo[],
): Promise<AccountIdNoPasswordDto[]> {
  return createdAccounts.map((createdAccount, index) => ({
    _id: createdAccount._id.toString(),
    username: createdAccount.username,
    role: createdAccount.role,
    accountInfo: {
      _id: createdAccountInfos[index]?._id.toString() || '',
      account: createdAccountInfos[index]?.account || '',
      name: createdAccountInfos[index]?.name || '',
      email: createdAccountInfos[index]?.email || '',
      phone: createdAccountInfos[index]?.phone || '',
    },
  }));
}

async function isConflictError(error: any): Promise<boolean> {
  return error.code === 11000;
}

async function throwConflictError(error: any): Promise<void> {
  throw new ResponseError({
    status: HttpStatus.CONFLICT,
    code: statics.codes.conflictRequest.code,
    message: statics.codes.conflictRequest.message,
    detail: replacePlaceholders(statics.messages.default.dataAlreadyExists, [
      Object.keys(error.keyValue)[0] || '',
    ]),
  });
}

export async function createMany(
  accountModel: Model<Account>,
  accountInfoModel: Model<AccountInfo>,
  createAccountsDto: AccountDto[],
): Promise<AccountIdNoPasswordDto[]> {
  try {
    const encryptAccountsDto = await encryptPasswords(createAccountsDto);
    const createdAccounts = await saveMany(accountModel, encryptAccountsDto);
    const createdAccountInfos = await createInfoMany(
      accountInfoModel,
      createAccountsDto,
      createdAccounts,
    );
    await updateAccountInfoIdOnAccounts(
      accountModel,
      createdAccounts,
      createdAccountInfos,
    );
    return modelToDtoMany(createdAccounts, createdAccountInfos);
  } catch (error) {
    if (await isConflictError(error)) await throwConflictError(error);
    throw error;
  }
}
