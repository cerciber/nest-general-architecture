import { IsString, IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
