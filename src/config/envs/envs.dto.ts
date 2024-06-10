import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnvsDto {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;
}
