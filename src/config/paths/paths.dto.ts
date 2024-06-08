import { IsDefined, IsObject } from 'class-validator';
import { PathDto } from './path.dto';

export class PathsDto {
  @IsDefined()
  @IsObject()
  root: PathDto<object>;

  @IsDefined()
  @IsObject()
  default: PathDto<object>;

  @IsDefined()
  @IsObject()
  test: PathDto<{
    success: PathDto<object>;
    error: PathDto<object>;
  }>;
}
