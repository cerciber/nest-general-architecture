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
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async update(filterPartialAccountDto: PartialAccountDto, updatePartialAccountDto: PartialAccountDto): Promise<Account> {
    const updatedAccount = await this.accountModel.findOneAndUpdate(filterPartialAccountDto, updatePartialAccountDto, { new: true }).exec();
    if (!updatedAccount) {
      throw new ResponseError(
        {
          status: HttpStatus.NOT_FOUND,
          message: statics.messages.labels.noFoundLabel,
        },
        `Account not found`,
      );
    }
    return updatedAccount;
  }
}