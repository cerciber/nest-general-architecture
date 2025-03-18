import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../../accounts/services/accounts.service';
import { canActivate } from './global-guard-service/can-activate';

@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return canActivate(context, this.jwtService, this.accountService);
  }
}
