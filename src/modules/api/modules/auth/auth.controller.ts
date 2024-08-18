import { Body, Controller, HttpStatus, RequestMapping } from '@nestjs/common';
import { AuthService } from './auth.service';
import { statics } from '@src/statics/statics';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import {
  AccountDto,
  AccountEmailAndPasswordDto,
} from '../accounts/dtos/account.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { AccountResponseDto } from '../accounts/dtos/account-response.dto';
import { AccountService } from '../accounts/services/account.service';

@ApiTags(statics.paths.auth.tag)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @RequestMapping({
    path: statics.paths.authLogin.path,
    method: statics.paths.authLogin.method,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async login(
    @Body() account: AccountEmailAndPasswordDto,
  ): Promise<TokenResponseDto> {
    const token = await this.authService.validateUserByEmail(
      account.email,
      account.password,
    );
    return {
      status: HttpStatus.OK,
      code: statics.codes.logginSuccess.code,
      message: statics.codes.logginSuccess.message,
      detail: statics.messages.default.loginSuccess,
      body: token,
    };
  }

  @RequestMapping({
    path: statics.paths.authSignup.path,
    method: statics.paths.authSignup.method,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AccountResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
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
  async signup(@Body() account: AccountDto): Promise<AccountResponseDto> {
    const createdAccount = await this.accountService.create(account);
    return {
      status: HttpStatus.CREATED,
      code: statics.codes.dataSavedSuccessfully.code,
      message: statics.codes.dataSavedSuccessfully.message,
      detail: statics.messages.accounts.create,
      body: createdAccount,
    };
  }
}
