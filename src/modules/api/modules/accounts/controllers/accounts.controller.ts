import { Body, Controller, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { statics } from '@src/common/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';
import {
  AccountResponseDto,
  AccountsResponseDto,
} from '../dtos/account-response.dto';
import { AccountDto, PartialAccountDto } from '../dtos/account.dto';
import { IdDto } from '@src/dtos/id.dto';
import { EndpointConfig } from '@src/common/decorators/enpoint-config.decorator';
import { findAll, findAllConfig } from './accounts-controller/find-all';
import { findById, findByIdConfig } from './accounts-controller/find-by-id';
import { create, createConfig } from './accounts-controller/create';
import {
  updateById,
  updateByIdConfig,
} from './accounts-controller/update-by-id';
import {
  deleteById,
  deleteByIdConfig,
} from './accounts-controller/delete-by-id';

@ApiTags(statics.paths.accounts.tag)
@Controller()
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @EndpointConfig(findAllConfig)
  async findAll(): Promise<AccountsResponseDto> {
    return findAll(this.accountService);
  }

  @EndpointConfig(findByIdConfig)
  async findById(@Param() params: IdDto): Promise<AccountResponseDto> {
    return findById(this.accountService, params);
  }

  @HttpCode(HttpStatus.CREATED)
  @EndpointConfig(createConfig)
  async create(@Body() account: AccountDto): Promise<AccountResponseDto> {
    return create(this.accountService, account);
  }

  @EndpointConfig(updateByIdConfig)
  async updateById(
    @Param() params: IdDto,
    @Body() updateAccountRequest: PartialAccountDto,
  ): Promise<AccountResponseDto> {
    return updateById(this.accountService, params, updateAccountRequest);
  }

  @EndpointConfig(deleteByIdConfig)
  async deleteById(@Param() params: IdDto): Promise<AccountResponseDto> {
    return deleteById(this.accountService, params);
  }
}
