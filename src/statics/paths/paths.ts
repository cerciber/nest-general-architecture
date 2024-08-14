import { create } from "domain";

export const paths = {
  root: {
    path: '',
    tag: 'Root',
    public: true,
    subpaths: {},
  },
  docs: {
    path: 'docs',
    tag: 'Docs',
    public: true,
    subpaths: {},
  },
  default: {
    path: '*',
    tag: 'Default',
    public: true,
    subpaths: {},
  },
  test: {
    path: 'test',
    tag: 'Test',
    public: true,
    subpaths: {
      success: {
        path: `success`,
        public: true,
        subpaths: {},
      },
      error: {
        path: 'error',
        public: true,
        subpaths: {},
      },
    },
  },
  accounts: {
    path: 'accounts',
    tag: 'Accounts',
    public: true,
    subpaths: {
      get: {
        path: '',
        public: true,
        subpaths: {},
      },
      getOne: {
        path: ':id',
        public: true,
        subpaths: {},
      },
      create: {
        path: '',
        public: true,
        subpaths: {},
      },
      update: {
        path: ':id',
        public: true,
        subpaths: {},
      },
      delete: {
        path: ':id',
        public: true,
        subpaths: {},
      },
    },
  },
};
