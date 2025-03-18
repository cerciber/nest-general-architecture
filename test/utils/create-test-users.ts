import { INestApplication } from '@nestjs/common';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';
import { statics } from '@src/common/statics/statics';
import { AccountIdNoPasswordDto } from '@src/modules/api/modules/accounts/dtos/account.dto';
import { AuthService } from '@src/modules/api/modules/auth/services/auth.service';

export async function createValidTestAdminUser(
  app: INestApplication,
  testAccountPassword: string,
): Promise<AccountIdNoPasswordDto> {
  const accountsService = app.get(AccountsService);
  try {
    const account =
      await accountsService.findByUsernameWithPassword('test_admin_1');
    await accountsService.deleteById(account._id);
  } catch {}
  const account = await accountsService.create({
    username: `test_admin_1`,
    password: testAccountPassword,
    role: statics.constants.roles.admin,
    accountInfo: {
      name: `Test Admin 1`,
      email: `test_admin_1@example.com`,
      phone: `+573202138120`,
    },
  });
  return account;
}

export async function createNonValidTestAdminUser(
  app: INestApplication,
): Promise<AccountIdNoPasswordDto> {
  const accountsService = app.get(AccountsService);
  const account = {
    _id: '000000000000000000000001',
    username: `test_admin_invalid_1`,
    role: statics.constants.roles.admin,
    accountInfo: {
      _id: '000000000000000000000002',
      account: '000000000000000000000003',
      name: `Test Admin Invalid 1`,
      email: `test_admin_invalid_1@example.com`,
      phone: `+573202138121`,
    },
  };
  try {
    const account = await accountsService.findByUsernameWithPassword(
      'test_admin_invalid_1',
    );
    await accountsService.deleteById(account._id);
  } catch {}
  return account;
}

export async function createValidTestClientUser(
  app: INestApplication,
  testClientPassword: string,
): Promise<AccountIdNoPasswordDto> {
  const accountsService = app.get(AccountsService);
  try {
    const account =
      await accountsService.findByUsernameWithPassword('test_client_1');
    await accountsService.deleteById(account._id);
  } catch {}
  const account = await accountsService.create({
    username: `test_client_1`,
    password: testClientPassword,
    role: statics.constants.roles.client,
    accountInfo: {
      name: `Test Client 1`,
      email: `test_client_1@example.com`,
      phone: `+573202138130`,
    },
  });
  return account;
}

export async function createNonValidTestClientUser(
  app: INestApplication,
): Promise<AccountIdNoPasswordDto> {
  const accountsService = app.get(AccountsService);
  const account = {
    _id: '000000000000000000000004',
    username: `test_client_invalid_1`,
    role: statics.constants.roles.client,
    accountInfo: {
      _id: '000000000000000000000005',
      account: '000000000000000000000006',
      name: `Test Client Invalid 1`,
      email: `test_client_invalid_1@example.com`,
      phone: `+573202138131`,
    },
  };
  try {
    const account = await accountsService.findByUsernameWithPassword(
      'test_client_invalid_1',
    );
    await accountsService.deleteById(account._id);
  } catch {}
  return account;
}

export async function loginTestUser(
  app: INestApplication,
  username: string,
  password: string,
): Promise<string> {
  const authService = app.get(AuthService);
  const tokenResponse = await authService.validateUserByUsername(
    username,
    password,
  );
  return tokenResponse.token;
}
