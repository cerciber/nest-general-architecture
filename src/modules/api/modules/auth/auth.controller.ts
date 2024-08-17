import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyGuard } from './services/api-key-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(ApiKeyGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}