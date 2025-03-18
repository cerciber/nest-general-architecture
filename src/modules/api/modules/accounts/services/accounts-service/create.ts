import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountDto, AccountIdNoPasswordDto } from '../../dtos/account.dto';
import { Model } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { hashSync } from 'bcrypt';
import { replacePlaceholders } from '@src/common/utils/replace-placeholders';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';

async function encryptPassword(
  createAccountDto: AccountDto,
): Promise<AccountDto> {
  return {
    ...createAccountDto,
    password: hashSync(
      createAccountDto.password,
      statics.constants.bcrypt.saltRounds,
    ),
  };
}

async function save(
  accountModel: Model<Account>,
  encryptAccountDto: AccountDto,
): Promise<Account> {
  const account = new accountModel(encryptAccountDto);
  return account.save();
}

async function createInfo(
  accountInfoModel: Model<AccountInfo>,
  createAccountDto: AccountDto,
  createdAccount: Account,
): Promise<AccountInfo> {
  const accountInfo = new accountInfoModel({
    account: createdAccount._id,
    name: createAccountDto.accountInfo.name,
    email: createAccountDto.accountInfo.email,
    phone: createAccountDto.accountInfo.phone,
  });
  return accountInfo.save();
}

async function updateAccountInfoIdOnAccount(
  accountModel: Model<Account>,
  createdAccount: Account,
  createdAccountInfo: AccountInfo,
): Promise<Account | null> {
  return accountModel.findByIdAndUpdate(createdAccount._id, {
    accountInfo: createdAccountInfo._id,
  });
}

async function modelToDto(
  createdAccount: Account,
  createdAccountInfo: AccountInfo,
): Promise<AccountIdNoPasswordDto> {
  return {
    _id: createdAccount._id.toString(),
    username: createdAccount.username,
    role: createdAccount.role,
    accountInfo: {
      _id: createdAccountInfo._id.toString(),
      account: createdAccountInfo.account,
      name: createdAccountInfo.name,
      email: createdAccountInfo.email,
      phone: createdAccountInfo.phone,
    },
  };
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

export async function create(
  accountModel: Model<Account>,
  accountInfoModel: Model<AccountInfo>,
  createAccountDto: AccountDto,
): Promise<AccountIdNoPasswordDto> {
  try {
    const encryptAccountDto = await encryptPassword(createAccountDto);
    const createdAccount = await save(accountModel, encryptAccountDto);
    const createdAccountInfo = await createInfo(
      accountInfoModel,
      createAccountDto,
      createdAccount,
    );
    await updateAccountInfoIdOnAccount(
      accountModel,
      createdAccount,
      createdAccountInfo,
    );
    return modelToDto(createdAccount, createdAccountInfo);
  } catch (error) {
    if (await isConflictError(error)) await throwConflictError(error);
    throw error;
  }
}
