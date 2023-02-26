import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({ default: true })
    isAvailable: boolean;

    @Prop({ required: true, })
    icon: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
