import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountDto } from '../dtos/account.dto';
import { PartialAccountDto } from '../dtos/partial-account.dto';
import { statics } from '@src/statics/statics';
import { ResponseError } from '@src/common/exceptions/response-error';
import { PartialAccountIdDto } from '../dtos/partial-account-id.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(filterPartialAccountDto: PartialAccountIdDto): Promise<Account> {
    const account = await this.accountModel.findOne(filterPartialAccountDto).exec();
    if (!account) {
      throw new ResponseError(
        {
          status: HttpStatus.NOT_FOUND,
          message: statics.messages.labels.noFoundLabel,
        },
        `Account not found`,
      );
    }
    return account;
  }

  async create(createAccountDto: AccountDto): Promise<Account> {
    try {
      const createdAccount = new this.accountModel(createAccountDto);
      return createdAccount.save();
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

  async update(filterPartialAccountDto: PartialAccountDto, updatePartialAccountDto: PartialAccountDto): Promise<Account[]> {
    try {
      const accountsToUpdate = await this.accountModel.find(filterPartialAccountDto).exec();
      const ids = accountsToUpdate.map(account => account._id);
      await this.accountModel.updateMany(filterPartialAccountDto, updatePartialAccountDto).exec();
      return this.accountModel.find({ _id: { $in: ids } }).exec();
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

  async delete(partialAccountDto: PartialAccountDto): Promise<Account[]> {
    const accountsToDelete = await this.accountModel.find(partialAccountDto).exec();
    await this.accountModel.deleteMany(partialAccountDto).exec();
    return accountsToDelete;
  }
}