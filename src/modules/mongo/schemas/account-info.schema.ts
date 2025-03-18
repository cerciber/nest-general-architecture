import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { statics } from '@src/common/statics/statics';

@Schema({
  timestamps: true,
  collection: statics.constants.mongoose.schemas.AccountInfo,
})
export class AccountInfo extends Document<Types.ObjectId> {
  @Prop({
    type: Types.ObjectId,
    ref: statics.constants.mongoose.schemas.Account,
    unique: true,
    required: true,
  })
  account: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  name: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  email: string = '';

  @Prop({
    type: String,
    trim: true,
    minlength: 1,
  })
  phone: string = '';
}

export const AccountInfoSchema = SchemaFactory.createForClass(AccountInfo);
