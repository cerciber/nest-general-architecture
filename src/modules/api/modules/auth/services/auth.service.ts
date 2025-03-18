import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../../accounts/services/accounts.service';
import { TokenDto } from '../dtos/token.dto';
import { validateUserByUsername } from './auth-service/validate-user-by-username';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByUsername(
    username: string,
    password: string,
  ): Promise<TokenDto> {
    return validateUserByUsername(
      this.jwtService,
      this.accountService,
      username,
      password,
    );
  }
}
