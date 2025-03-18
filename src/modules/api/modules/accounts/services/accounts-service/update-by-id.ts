import { Account } from '@src/modules/mongo/schemas/account.schema';
import {
  AccountIdNoPasswordDto,
  AccountNames,
  PartialAccountDto,
} from '../../dtos/account.dto';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { replacePlaceholders } from '@src/common/utils/replace-placeholders';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';
import { hashSync } from 'bcrypt';

async function getBaseAccountData(
  updateData: PartialAccountDto,
): Promise<PartialAccountDto> {
  return {
    username: updateData.username,
    role: updateData.role,
    password: updateData.password,
  };
}

async function encryptPassword(
  updatePartialAccountDto: PartialAccountDto,
): Promise<PartialAccountDto> {
  if (!updatePartialAccountDto.password) return updatePartialAccountDto;
  return {
    ...updatePartialAccountDto,
    password: hashSync(
      updatePartialAccountDto.password,
      statics.constants.bcrypt.saltRounds,
    ),
  };
}

async function updateOne(
  accountModel: Model<Account>,
  _id: string,
  updateData: PartialAccountDto,
): Promise<UpdateWriteOpResult> {
  return accountModel.updateOne({ _id }, updateData).exec();
}

async function updateOneInfo(
  accountInfoModel: Model<AccountInfo>,
  _id: string,
  updateData: PartialAccountDto,
): Promise<UpdateWriteOpResult> {
  return accountInfoModel
    .updateOne({ account: _id }, updateData.accountInfo)
    .exec();
}

async function getUpdatedAccount(
  accountModel: Model<Account>,
  _id: string,
): Promise<Account | null> {
  return accountModel
    .findOne({ _id })
    .populate({ path: AccountNames.accountInfo })
    .exec();
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

async function isConflictError(error: any): Promise<boolean> {
  return error.code === 11000;
}

async function noDataUpdated(updateResult: any): Promise<boolean> {
  return updateResult.modifiedCount === 0;
}

async function notAccountError(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.NOT_FOUND,
    code: statics.codes.noDataFound.code,
    message: statics.codes.noDataFound.message,
    detail: statics.messages.accounts.notFound,
  });
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

export async function updateById(
  accountModel: Model<Account>,
  accountInfoModel: Model<AccountInfo>,
  _id: string,
  updatePartialAccountDto: PartialAccountDto,
): Promise<AccountIdNoPasswordDto> {
  try {
    const baseAccountData = await getBaseAccountData(updatePartialAccountDto);
    const encryptPartialAccountDto = await encryptPassword(
      updatePartialAccountDto,
    );
    const updateResult = await updateOne(accountModel, _id, baseAccountData);
    if (await noDataUpdated(updateResult)) throw await notAccountError();
    if (updatePartialAccountDto.accountInfo)
      await updateOneInfo(accountInfoModel, _id, encryptPartialAccountDto);
    const updatedAccount = await getUpdatedAccount(accountModel, _id);
    if (!updatedAccount) throw await notAccountError();
    return mapToDto(updatedAccount);
  } catch (error) {
    if (await isConflictError(error)) await throwConflictError(error);
    throw error;
  }
}
