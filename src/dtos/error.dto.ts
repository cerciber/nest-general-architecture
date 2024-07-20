import { IsArray, IsDefined, IsString } from 'class-validator';

export class ErrorDto {
  @IsString()
  id: string;

  @IsString()
  message: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  stack?: string[];
}
