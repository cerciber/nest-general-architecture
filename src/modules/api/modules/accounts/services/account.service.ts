import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountDto } from '../dtos/account.dto';
import { PartialAccountDto } from '../dtos/partial-account.dto';
import { statics } from '@src/statics/statics';
import { ResponseError } from '@src/common/exceptions/response-error';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async create(createAccountDto: AccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(partialAccountDto: PartialAccountDto): Promise<Account> {
    const account = await this.accountModel.findOne(partialAccountDto).exec();
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

  async update(id: string, partialAccountDto: PartialAccountDto): Promise<Account> {
    const updatedAccount = await this.accountModel
      .findByIdAndUpdate(id, partialAccountDto, { new: true })
      .exec();
    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return updatedAccount;
  }

  async remove(id: string): Promise<void> {
    const result = await this.accountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
  }
}