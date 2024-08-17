import { RequestMethod } from "@nestjs/common";

class Path {
  path: string;
  method?: RequestMethod;
  tag?: string;
  public?: boolean;
}
const paths: Record<string, Path> = {};

paths.root = {
  path: '/',
  tag: 'Root',
  method: RequestMethod.GET,
  public: true,
};

paths.docs = {
  path: '/docs',
  public: true,
};

paths.default = {
  path: '*',
  tag: 'Default',
  public: true,
};

paths.test = {
  path: '/test',
  tag: 'Test',
};

paths.testSuccess = {
  path: `${paths.test.path}/success`,
  method: RequestMethod.GET,
  public: true,
};

paths.testError = {
  path: `${paths.test.path}/error`,
  method: RequestMethod.GET,
  public: true,
};

paths.accounts = {
  path: '/accounts',
  tag: 'Accounts',
};

paths.accountsGet = {
  path: `${paths.accounts.path}`,
  method: RequestMethod.GET,
  public: true,
};

paths.accountsGetOne = {
  path: `${paths.accounts.path}/:id`,
  method: RequestMethod.GET,
  public: true,
};

paths.accountsCreate = {
  path: `${paths.accounts.path}`,
  method: RequestMethod.POST,
  public: true,
};

paths.accountsUpdate = {
  path: `${paths.accounts.path}/:id`,
  method: RequestMethod.PATCH,
  public: true,
};

paths.accountsDelete = {
  path: `${paths.accounts.path}/:id`,
  method: RequestMethod.DELETE,
  public: true,
};

export { paths };