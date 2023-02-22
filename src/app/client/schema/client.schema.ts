import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ minlength: 7, maxlength: 10, required: true })
  contact: number;

  @Prop()
  logo: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

// ClientSchema.pre()
