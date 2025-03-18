import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/response-error';
import { Path, paths } from '@src/common/statics/paths/paths';
import { statics } from '@src/common/statics/statics';
import { Request } from 'express';
import { RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../../../accounts/services/accounts.service';
import { PayloadDto } from '../../dtos/payload.dto';
import { AccountIdNoPasswordDto } from '../../../accounts/dtos/account.dto';

async function getRequest(context: ExecutionContext): Promise<Request> {
  return context.switchToHttp().getRequest<Request>();
}

async function getPathList(): Promise<Path[]> {
  const allPaths: Path[] = [];
  Object.values(paths).forEach((group) => {
    Object.values(group.subpaths).forEach((path) => {
      allPaths.push(path);
    });
  });
  return allPaths;
}

async function getPublicPath(request: Request): Promise<{
  isPublic: boolean;
  path: Path | undefined;
}> {
  const path = (await getPathList()).find(
    (path) =>
      path.method ===
        RequestMethod[request.method as keyof typeof RequestMethod] &&
      path.path === request.route.path,
  );
  return { isPublic: !path || !path.roles.length, path };
}

async function validateToken(
  jwtService: JwtService,
  request: Request,
): Promise<PayloadDto | undefined> {
  const authHeader = request.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return;
  }
  const bearerTokenMatch = authHeader.match(/^Bearer\s+(\S+)$/);
  if (!bearerTokenMatch) {
    return;
  }
  const token = bearerTokenMatch[1] || '';
  try {
    const payload: PayloadDto = jwtService.verify(token);
    return payload;
  } catch {
    return;
  }
}

async function validateAuthorization(
  accountService: AccountsService,
  path: Path,
  payload: PayloadDto,
): Promise<{
  validAuthorization: boolean;
  account: AccountIdNoPasswordDto | undefined;
}> {
  try {
    const account = await accountService.findByIdWithPassword(payload._id);
    if (!account) {
      return { validAuthorization: false, account: undefined };
    }
    const userRole = account.role;
    return { validAuthorization: path.roles.includes(userRole), account };
  } catch (error: any) {
    if (error?.response?.status === HttpStatus.NOT_FOUND) {
      return { validAuthorization: false, account: undefined };
    }
    throw error;
  }
}

async function unauthorizedError(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.UNAUTHORIZED,
    code: statics.codes.unauthorizedRequest.code,
    message: statics.codes.unauthorizedRequest.message,
    detail: statics.messages.default.unauthorized,
  });
}

async function setAccountLocals(
  request: Request,
  account: AccountIdNoPasswordDto,
): Promise<void> {
  if (!request?.res?.locals) throw await unauthorizedError();
  request.res.locals.account = account;
}

export async function canActivate(
  context: ExecutionContext,
  jwtService: JwtService,
  accountService: AccountsService,
): Promise<boolean> {
  const request = await getRequest(context);
  const { isPublic, path } = await getPublicPath(request);
  if (isPublic) return true;
  if (!path) throw await unauthorizedError();
  const payload = await validateToken(jwtService, request);
  if (!payload) throw await unauthorizedError();
  const { validAuthorization, account } = await validateAuthorization(
    accountService,
    path,
    payload,
  );
  if (!validAuthorization || !account) throw await unauthorizedError();
  await setAccountLocals(request, account);
  return true;
}
