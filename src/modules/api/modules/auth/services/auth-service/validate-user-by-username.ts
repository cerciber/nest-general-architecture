import { AccountsService } from '../../../accounts/services/accounts.service';
import { TokenDto } from '../../dtos/token.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountIdNoPasswordDto } from '../../../accounts/dtos/account.dto';
import { PayloadDto } from '../../dtos/payload.dto';

async function buildPayload(
  account: AccountIdNoPasswordDto,
): Promise<PayloadDto> {
  return { _id: account._id };
}

async function buildTokenResponse(
  jwtService: JwtService,
  payload: PayloadDto,
): Promise<TokenDto> {
  return {
    token: jwtService.sign(payload),
  };
}

async function generateToken(
  jwtService: JwtService,
  account: AccountIdNoPasswordDto,
): Promise<TokenDto> {
  const payload = await buildPayload(account);
  return buildTokenResponse(jwtService, payload);
}

async function unauthorizedError(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.UNAUTHORIZED,
    code: statics.codes.unauthorizedRequest.code,
    message: statics.codes.unauthorizedRequest.message,
    detail: statics.messages.default.incorrectEmailOrPassword,
  });
}

export async function validateUserByUsername(
  jwtService: JwtService,
  accountService: AccountsService,
  username: string,
  password: string,
): Promise<TokenDto> {
  const account = await accountService.findByUsernameWithPassword(username);
  if (!account) throw await unauthorizedError();
  const validPassword = compareSync(password, account.password);
  if (!validPassword) throw await unauthorizedError();
  return generateToken(jwtService, account);
}
