import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { AccountService } from '@src/modules/mongo/services/account.service';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountsResponseDto } from './dtos/accounts-response.dto';
import { AccountResponseDto } from './dtos/account-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';

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
    return {
      status: HttpStatus.OK,
      message: statics.messages.custom.accounts.successMessage,
      body: await this.accountService.findAll(),
    }
  }

  @Get(statics.paths.accounts.subpaths.getOne.path)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountResponseDto,
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
    @Param(statics.paths.accounts.subpaths.getOne.params.id) id: string
  ): Promise<AccountResponseDto> {
    return {
      status: HttpStatus.OK,
      message: statics.messages.custom.accounts.successMessage,
      body: await this.accountService.findOne(id),
    }
  }
}
