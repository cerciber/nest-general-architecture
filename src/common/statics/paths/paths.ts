import { RequestMethod } from '@nestjs/common';
import { docs } from '../docs/docs';
import { constants } from '../constants/constants';

export class Path {
  path: string = '';
  method: RequestMethod = RequestMethod.GET;
  roles: string[] = [];
  summary: string = '';
}

const paths = {
  root: {
    tag: 'Root',
    path: '/',
    subpaths: {},
  },
  docs: {
    tag: 'Docs',
    path: '/docs',
    subpaths: {},
  },
  default: {
    tag: 'Default',
    path: '/*',
    subpaths: {
      defaultGet: {
        path: '/*',
        method: RequestMethod.GET,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultPost: {
        path: '/*',
        method: RequestMethod.POST,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultPatch: {
        path: '/*',
        method: RequestMethod.PATCH,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultPut: {
        path: '/*',
        method: RequestMethod.PUT,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultDelete: {
        path: '/*',
        method: RequestMethod.DELETE,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
    },
  },
  accounts: {
    tag: 'Accounts',
    path: '/accounts',
    subpaths: {
      accountsGet: {
        path: '/accounts',
        method: RequestMethod.GET,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsGet,
      },
      accountsGetOne: {
        path: '/accounts/:_id',
        method: RequestMethod.GET,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsGetOne,
      },
      accountsCreate: {
        path: '/accounts',
        method: RequestMethod.POST,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsCreate,
      },
      accountsUpdate: {
        path: '/accounts/:_id',
        method: RequestMethod.PATCH,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsUpdate,
      },
      accountsDelete: {
        path: '/accounts/:_id',
        method: RequestMethod.DELETE,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsDelete,
      },
    },
  },
  auth: {
    tag: 'Auth',
    path: '/auth',
    subpaths: {
      authLogin: {
        path: '/auth/login',
        method: RequestMethod.POST,
        roles: [],
        summary: docs.summaries.authLogin,
      },
    },
  },
};

export { paths };
