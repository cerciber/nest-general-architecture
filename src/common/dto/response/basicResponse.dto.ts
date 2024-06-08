import { IsNumber, IsString } from 'class-validator';

export class BasicResponseDto {
  @IsNumber()
  status: number;

  @IsString()
  message: string;
}
