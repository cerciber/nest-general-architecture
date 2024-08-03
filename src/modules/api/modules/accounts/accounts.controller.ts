import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { AccountService } from '@src/modules/api/modules/accounts/services/account.service';
import { AccountsResponseDto } from './dtos/accounts-response.dto';
import { AccountResponseDto } from './dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AccountDto } from './dtos/account.dto';
import { UpdateAccountRequestDto } from './dtos/update-account.dto';
import { PartialAccountIdDto } from './dtos/partial-account-id.dto';
import { IdDto } from './dtos/id.dto';

@ApiTags(statics.paths.accounts.tag)
@Controller(statics.paths.accounts.path)
export class AccountsController {
  constructor(private readonly accountService: AccountService) { }

  @Get(statics.paths.accounts.subpaths.get.path)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async findAll(): Promise<AccountsResponseDto> {
    const accounts = await this.accountService.findAll();
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataRetrievedSuccessfully.code,
      message: statics.codes.dataRetrievedSuccessfully.message,
      detail: statics.messages.accounts.findAll,
      body: accounts
    }
  }

  @Get(statics.paths.accounts.subpaths.getOne.path)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async findOne(
    @Param() params: IdDto
  ): Promise<AccountResponseDto> {
    const account = await this.accountService.findOne({ id: params.id });
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataRetrievedSuccessfully.code,
      message: statics.codes.dataRetrievedSuccessfully.message,
      detail: statics.messages.accounts.findOne,
      body: account
    }
  }

  @Post(statics.paths.accounts.subpaths.create.path)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AccountResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async create(@Body() account: AccountDto): Promise<AccountResponseDto> {
    const createdAccount = await this.accountService.create(account);
    return {
      status: HttpStatus.CREATED,
      code: statics.codes.dataSavedSuccessfully.code,
      message: statics.codes.dataSavedSuccessfully.message,
      detail: statics.messages.accounts.create,
      body: createdAccount,
    };
  }

  @Put(statics.paths.accounts.subpaths.update.path)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async update(
    @Body() updateAccountRequest: UpdateAccountRequestDto,
  ): Promise<AccountsResponseDto> {
    const updatedAccounts = await this.accountService.update(updateAccountRequest.filter, updateAccountRequest.update);
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataUpdatedSuccessfully.code,
      message: statics.codes.dataUpdatedSuccessfully.message,
      detail: statics.messages.accounts.update,
      body: updatedAccounts
    };
  }

  @Delete(statics.paths.accounts.subpaths.delete.path)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async delete(@Body() filter: PartialAccountIdDto): Promise<AccountsResponseDto> {
    const deletedAccounts = await this.accountService.delete(filter);
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataDeletedSuccessfully.code,
      message: statics.codes.dataDeletedSuccessfully.message,
      detail: statics.messages.accounts.delete,
      body: deletedAccounts
    };
  }

}
