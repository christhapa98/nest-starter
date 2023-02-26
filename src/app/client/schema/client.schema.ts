import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ index: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ minlength: 7, maxlength: 10, required: true })
  contact: number;

  @Prop()
  logo: string;

  @Prop({ default: true })
  isActive: string;

}

export const ClientSchema = SchemaFactory.createForClass(Client);

