import { Body, Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { statics } from '@src/common/statics/statics';
import { ApiTags } from '@nestjs/swagger';
import { AccountUsernameAndPasswordDto } from '../../accounts/dtos/account.dto';
import { TokenResponseDto } from '../dtos/token-response.dto';
import { EndpointConfig } from '@src/common/decorators/enpoint-config.decorator';
import { login, loginConfig } from './auth-controller/login';

@ApiTags(statics.paths.auth.tag)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EndpointConfig(loginConfig)
  async login(
    @Body() account: AccountUsernameAndPasswordDto,
  ): Promise<TokenResponseDto> {
    return login(this.authService, account);
  }
}
