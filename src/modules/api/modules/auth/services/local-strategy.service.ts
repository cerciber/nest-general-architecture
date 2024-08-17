import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { statics } from '@src/statics/statics';
import { AuthService } from '../auth.service';
import { ResponseError } from '@src/common/exceptions/response-error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    try {
      return await this.authService.validateUserByEmail(email, password);
    } catch (error) {
      throw new ResponseError(
        {
          status: HttpStatus.UNAUTHORIZED,
          code: statics.codes.unauthorizedRequest.code,
          message: statics.codes.unauthorizedRequest.message,
          detail: statics.messages.default.incorrectUserOrPassword,
        },
      );
    }
  }
}