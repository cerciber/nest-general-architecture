import { IsArray, IsDefined, IsString } from 'class-validator';

export class ErrorDto {
  @IsString()
  message: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  stack: string[];
}
