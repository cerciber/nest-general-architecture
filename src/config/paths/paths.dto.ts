export class PathDto<Subpaths> {
  path: string;
  tag?: string;
  public: boolean;
  subpaths: Subpaths;
}

export class PathsDto {
  root: PathDto<object>;
  default: PathDto<object>;
  test: PathDto<{
    success: PathDto<object>;
    error: PathDto<object>;
  }>;
}
