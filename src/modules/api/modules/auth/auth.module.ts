import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomConfigModule } from '@src/modules/custom-config/custom-config.module';
import { CustomConfigService } from '@src/modules/custom-config/services/custom-config.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { statics } from '@src/common/statics/statics';
import { AccountsService } from '../accounts/services/accounts.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: async (customConfigService: CustomConfigService) => ({
        secret: customConfigService.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: statics.constants.jwt.tokensExpireIn },
      }),
    }),
  ],
  providers: [AuthService, AccountsService],
  controllers: [AuthController],
})
export class AuthModule {}
