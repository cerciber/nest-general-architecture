import 'tsconfig-paths/register';
import { app as configApp } from '@src/main';
import { INestApplication } from '@nestjs/common';
import {
  createValidTestAdminUser,
  createNonValidTestAdminUser,
  createValidTestClientUser,
  createNonValidTestClientUser,
  loginTestUser,
} from './utils/create-test-users';
import { AccountIdNoPasswordDto } from '@src/modules/api/modules/accounts/dtos/account.dto';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';

async function getApp(): Promise<INestApplication<any>> {
  return configApp;
}

async function createTestUsers(app: INestApplication<any>): Promise<{
  testAccountPassword: string;
  testInvalidAccountPassword: string;
  validTestAdminUser: AccountIdNoPasswordDto;
  nonValidTestAdminUser: AccountIdNoPasswordDto;
  validTestClientUser: AccountIdNoPasswordDto;
  nonValidTestClientUser: AccountIdNoPasswordDto;
  validTestAdminToken: string;
  validTestClientToken: string;
}> {
  const testAccountPassword = 'ABC#abc#123';
  const testInvalidAccountPassword = 'DEF#def#456';
  const validTestAdminUser = await createValidTestAdminUser(
    app,
    testAccountPassword,
  );
  const nonValidTestAdminUser = await createNonValidTestAdminUser(app);
  const validTestClientUser = await createValidTestClientUser(
    app,
    testAccountPassword,
  );
  const nonValidTestClientUser = await createNonValidTestClientUser(app);
  const validTestAdminToken = await loginTestUser(
    app,
    validTestAdminUser.username,
    testAccountPassword,
  );
  const validTestClientToken = await loginTestUser(
    app,
    validTestClientUser.username,
    testAccountPassword,
  );
  return {
    testAccountPassword,
    testInvalidAccountPassword,
    validTestAdminUser,
    nonValidTestAdminUser,
    validTestClientUser,
    nonValidTestClientUser,
    validTestAdminToken,
    validTestClientToken,
  };
}

export default async (): Promise<void> => {
  const app = await getApp();
  await app.init();
  const usersData = await createTestUsers(app);
  global.testEnviroment = {
    app,
    accountsService: app.get(AccountsService),
    ...usersData,
  };
};
