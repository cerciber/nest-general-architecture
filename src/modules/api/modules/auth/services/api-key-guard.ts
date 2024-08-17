import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/response-error';
import { paths } from '@src/statics/paths/paths';
import { statics } from '@src/statics/statics';
import { Request } from 'express';
import { RequestMethod } from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (this.valdatePublicPath(request)) {
      return true;
    }

    const authHeader = request.header('Auth');
    const valid = authHeader === '123456'
    if (!valid) {
      throw new ResponseError(
        {
          status: HttpStatus.UNAUTHORIZED,
          code: statics.codes.unauthorizedRequest.code,
          message: statics.codes.unauthorizedRequest.message,
          detail: statics.messages.default.unauthorized,
        },
      );
    }
    return valid;
  }

  private valdatePublicPath(request: Request) {
    const path = this.getPath(request.method, request.route.path);
    return path && path.public
  }

  private getPath(method: string, url: string) {
    const key = Object.keys(paths).find(key => paths[key].method === RequestMethod[method] && paths[key].path === url);
    return paths[key]
  }
}