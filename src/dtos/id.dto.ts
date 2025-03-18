import { IsMongoId } from 'class-validator';

export class IdDto {
  @IsMongoId()
  _id: string;
}
