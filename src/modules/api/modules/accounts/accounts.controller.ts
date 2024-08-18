import { Body, Controller, Param, RequestMapping } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { AccountService } from '@src/modules/api/modules/accounts/services/account.service';
import {
  AccountResponseDto,
  AccountsResponseDto,
} from './dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AccountDto, PartialAccountDto } from './dtos/account.dto';
import { IdDto } from '@src/dtos/id.dto';
import { ResponseError } from '@src/common/exceptions/response-error';

@ApiTags(statics.paths.accounts.tag)
@Controller()
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @RequestMapping({
    path: statics.paths.accountsGet.path,
    method: statics.paths.accountsGet.method,
  })
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
      body: accounts,
    };
  }

  @RequestMapping({
    path: statics.paths.accountsGetOne.path,
    method: statics.paths.accountsGetOne.method,
  })
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
  async findOne(@Param() params: IdDto): Promise<AccountResponseDto> {
    const account = await this.accountService.findOne({ id: params.id });
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataRetrievedSuccessfully.code,
      message: statics.codes.dataRetrievedSuccessfully.message,
      detail: statics.messages.accounts.findOne,
      body: account,
    };
  }

  @RequestMapping({
    path: statics.paths.accountsCreate.path,
    method: statics.paths.accountsCreate.method,
  })
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

  @RequestMapping({
    path: statics.paths.accountsUpdate.path,
    method: statics.paths.accountsUpdate.method,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountsResponseDto,
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
    status: HttpStatus.CONFLICT,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async update(
    @Param() params: IdDto,
    @Body() updateAccountRequest: PartialAccountDto,
  ): Promise<AccountResponseDto> {
    const updatedAccounts = await this.accountService.update(
      { id: params.id },
      updateAccountRequest,
    );
    if (updatedAccounts.length === 0) {
      throw new ResponseError({
        status: HttpStatus.NOT_FOUND,
        code: statics.codes.noDataFound.code,
        message: statics.codes.noDataFound.message,
        detail: statics.messages.accounts.notFound,
      });
    }
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataUpdatedSuccessfully.code,
      message: statics.codes.dataUpdatedSuccessfully.message,
      detail: statics.messages.accounts.update,
      body: updatedAccounts[0],
    };
  }

  @RequestMapping({
    path: statics.paths.accountsDelete.path,
    method: statics.paths.accountsDelete.method,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountsResponseDto,
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
  async delete(@Param() params: IdDto): Promise<AccountResponseDto> {
    const deletedAccounts = await this.accountService.delete({ id: params.id });
    if (deletedAccounts.length === 0) {
      throw new ResponseError({
        status: HttpStatus.NOT_FOUND,
        code: statics.codes.noDataFound.code,
        message: statics.codes.noDataFound.message,
        detail: statics.messages.accounts.notFound,
      });
    }
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataDeletedSuccessfully.code,
      message: statics.codes.dataDeletedSuccessfully.message,
      detail: statics.messages.accounts.delete,
      body: deletedAccounts[0],
    };
  }
}
