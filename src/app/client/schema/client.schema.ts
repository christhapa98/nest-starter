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

  @Prop({ min: 7, max: 8, required: true })
  contact: number;

  @Prop()
  logo: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

// ClientSchema.pre()
