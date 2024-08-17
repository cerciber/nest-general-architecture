import { Body, Controller, HttpStatus, Post, Request, RequestMapping } from '@nestjs/common';
import { AuthService } from './auth.service';
import { statics } from '@src/statics/statics';
import { AccountResponseDto, AccountsResponseDto } from '../accounts/dtos/account-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AccountEmailAndPasswordDto } from '../accounts/dtos/account.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@ApiTags(statics.paths.auth.tag)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @RequestMapping({ path: statics.paths.authLogin.path, method: statics.paths.authLogin.method })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  async login(@Body() account: AccountEmailAndPasswordDto): Promise<TokenResponseDto> {
    const token = await this.authService.validateUserByEmail(account.email, account.password);
    return {
      status: HttpStatus.OK,
      code: statics.codes.logginSuccess.code,
      message: statics.codes.logginSuccess.message,
      detail: statics.messages.default.loginSuccess,
      body: token,
    };
  }
}