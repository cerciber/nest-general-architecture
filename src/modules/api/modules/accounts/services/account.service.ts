import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountDto } from '../dtos/account.dto';
import { PartialAccountDto } from '../dtos/partial-account.dto';
import { statics } from '@src/statics/statics';
import { ResponseError } from '@src/common/exceptions/response-error';
import { PartialAccountIdDto } from '../dtos/partial-account-id.dto';
import { omit, omitBy, isUndefined } from 'lodash';
import { replaceKey } from '@src/common/functions/replace-key';
import { AccountIdDto } from '../dtos/account-id.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async findAll(): Promise<AccountIdDto[]> {
    const accounts = await this.accountModel.find().exec();
    return accounts.map((account: Account) => ({
      id: account._id.toString(),
      username: account.username,
      email: account.email,
      password: account.password,
    }))
  }

  async findOne(accountDto: PartialAccountIdDto): Promise<AccountIdDto> {
    const adaptedAccountDto = replaceKey<PartialAccountIdDto>(accountDto, 'id', '_id')
    const account = await this.accountModel.findOne(adaptedAccountDto).exec()
    if (!account) {
      throw new ResponseError(
        {
          status: HttpStatus.NOT_FOUND,
          message: statics.messages.labels.noFoundLabel,
        },
        `Account not found`,
      );
    }
    return {
      id: account._id.toString(),
      username: account.username,
      email: account.email,
      password: account.password,
    };
  }

  async create(createAccountDto: AccountDto): Promise<AccountIdDto> {
    try {
      const account = new this.accountModel(createAccountDto);
      const createdAccount = await account.save();
      return {
        id: createdAccount._id.toString(),
        username: createdAccount.username,
        email: createdAccount.email,
        password: createdAccount.password,
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ResponseError(
          {
            status: HttpStatus.CONFLICT,
            message: statics.messages.labels.noFoundLabel,
          },
          'Username or email already exists',
        );
      }
      throw error
    }
  }

  async update(filterPartialAccountDto: PartialAccountDto, updatePartialAccountDto: PartialAccountDto): Promise<AccountIdDto[]> {
    try {
      const accountsToUpdate = await this.accountModel.find(filterPartialAccountDto).exec();
      const ids = accountsToUpdate.map(account => account._id);
      await this.accountModel.updateMany(filterPartialAccountDto, updatePartialAccountDto).exec();
      const updatedAccounts = await this.accountModel.find({ _id: { $in: ids } }).exec();
      return updatedAccounts.map((account: Account) => ({
        id: account._id.toString(),
        username: account.username,
        email: account.email,
        password: account.password,
      }))
    } catch (error) {
      if (error.code === 11000) {
        throw new ResponseError(
          {
            status: HttpStatus.CONFLICT,
            message: statics.messages.labels.noFoundLabel,
          },
          'Username or email already exists',
        );
      }
      throw error
    }
  }

  async delete(partialAccountDto: PartialAccountDto): Promise<AccountIdDto[]> {
    const accountsToDelete = await this.accountModel.find(partialAccountDto).exec();
    await this.accountModel.deleteMany(partialAccountDto).exec();
    return accountsToDelete.map((account: Account) => ({
      id: account._id.toString(),
      username: account.username,
      email: account.email,
      password: account.password,
    }))
  }
}