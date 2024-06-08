import { PathsDto } from './paths.dto';

export const paths: PathsDto = {
  root: {
    path: '',
    tag: 'Root',
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
};
