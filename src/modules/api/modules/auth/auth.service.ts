import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = { userId: 1, username: 'testuser' };
    if (user && pass === 'testpass') {
      return user;
    }
    return null;
  }

  // Generar un JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}