import { IsBoolean, IsObject, IsString } from 'class-validator';

export class PathDto<Subpaths> {
  @IsString()
  path: string;

  @IsString()
  tag?: string;

  @IsBoolean()
  public: boolean;

  @IsObject()
  subpaths: Subpaths;
}
