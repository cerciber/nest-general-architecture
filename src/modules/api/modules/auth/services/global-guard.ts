import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/response-error';
import { paths } from '@src/statics/paths/paths';
import { statics } from '@src/statics/statics';
import { Request } from 'express';
import { RequestMethod } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (this.valdatePublicPath(request)) {
      return true;
    }

    if (this.validateToken(request)) {
      return true;
    }

    throw new ResponseError(
      {
        status: HttpStatus.UNAUTHORIZED,
        code: statics.codes.unauthorizedRequest.code,
        message: statics.codes.unauthorizedRequest.message,
        detail: statics.messages.default.unauthorized,
      },
    );
  }

  private valdatePublicPath(request: Request) {
    const key = Object.keys(paths).find(key => paths[key].method === RequestMethod[request.method] && paths[key].path === request.route.path);
    const path = paths[key]
    return path && path.public
  }

  private validateToken(request: Request) {
    const authHeader = request.header('Auth');
    if (!authHeader) {
      return false
    }
    try {
      this.jwtService.verify(authHeader);
      return true
    } catch (error) {
      return false
    }
  }
}