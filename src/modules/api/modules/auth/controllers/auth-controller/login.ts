import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { AuthService } from '../../services/auth.service';
import { AccountUsernameAndPasswordDto } from '../../../accounts/dtos/account.dto';
import { TokenResponseDto } from '../../dtos/token-response.dto';

export const loginConfig = {
  path: statics.paths.auth.subpaths.authLogin,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: TokenResponseDto,
    },
    {
      status: HttpStatus.BAD_REQUEST,
      type: ErrorResponseDto,
    },
    {
      status: HttpStatus.UNAUTHORIZED,
      type: ErrorResponseDto,
    },
  ],
};

export async function login(
  authService: AuthService,
  account: AccountUsernameAndPasswordDto,
): Promise<TokenResponseDto> {
  const token = await authService.validateUserByUsername(
    account.username,
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
