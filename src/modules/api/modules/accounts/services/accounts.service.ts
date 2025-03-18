import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import {
  AccountDto,
  AccountIdDto,
  AccountIdNoPasswordDto,
  PartialAccountDto,
} from '../dtos/account.dto';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';
import { findAll } from './accounts-service/find-all';
import { findById } from './accounts-service/find-by-id';
import { findByIdWithPassword } from './accounts-service/find-by-id-with-password';
import { findByUsernameWithPassword } from './accounts-service/find-by-username-with-password';
import { create } from './accounts-service/create';
import { updateById } from './accounts-service/update-by-id';
import { deleteById } from './accounts-service/delete-by-id';
import { deleteAll } from './accounts-service/delete-all';
import { createMany } from './accounts-service/create-many';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(AccountInfo.name) private accountInfoModel: Model<AccountInfo>,
  ) {}

  async findAll(): Promise<AccountIdNoPasswordDto[]> {
    return findAll(this.accountModel);
  }

  async findById(_id: string): Promise<AccountIdNoPasswordDto> {
    return findById(this.accountModel, _id);
  }

  async findByIdWithPassword(_id: string): Promise<AccountIdNoPasswordDto> {
    return findByIdWithPassword(this.accountModel, _id);
  }

  async findByUsernameWithPassword(username: string): Promise<AccountIdDto> {
    return findByUsernameWithPassword(this.accountModel, username);
  }

  async create(createAccountDto: AccountDto): Promise<AccountIdNoPasswordDto> {
    return create(this.accountModel, this.accountInfoModel, createAccountDto);
  }

  async createMany(
    createAccountsDto: AccountDto[],
  ): Promise<AccountIdNoPasswordDto[]> {
    return createMany(
      this.accountModel,
      this.accountInfoModel,
      createAccountsDto,
    );
  }

  async updateById(
    _id: string,
    updatePartialAccountDto: PartialAccountDto,
  ): Promise<AccountIdNoPasswordDto> {
    return updateById(
      this.accountModel,
      this.accountInfoModel,
      _id,
      updatePartialAccountDto,
    );
  }

  async deleteById(_id: string): Promise<AccountIdNoPasswordDto> {
    return deleteById(this.accountModel, this.accountInfoModel, _id);
  }

  async deleteAll(): Promise<void> {
    return deleteAll(this.accountModel, this.accountInfoModel);
  }
}
