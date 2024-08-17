import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomConfigService } from '@src/modules/custom-config/custom-config.service';
import { statics } from '@src/statics/statics';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(customConfigService: CustomConfigService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: statics.constants.jwt.ignoreExpiration,
      secretOrKey: customConfigService.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.name, payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}