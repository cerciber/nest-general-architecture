import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { statics } from '@src/common/statics/statics';
import { Document, Types } from 'mongoose';
import { AccountInfo } from './account-info.schema';

@Schema({
  timestamps: true,
  collection: statics.constants.mongoose.schemas.Account,
})
export class Account extends Document<Types.ObjectId> {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  })
  username: string = '';

  @Prop({ type: String, required: true })
  password: string = '';

  @Prop({
    type: String,
    required: true,
    enum: Object.values(statics.constants.roles),
  })
  role: string = '';

  @Prop({
    type: Types.ObjectId,
    ref: statics.constants.mongoose.schemas.AccountInfo,
  })
  accountInfo?: AccountInfo;

  @Prop({ type: Date })
  createdAt: Date = new Date();

  @Prop({ type: Date })
  updatedAt: Date = new Date();
}

export const AccountSchema = SchemaFactory.createForClass(Account);
