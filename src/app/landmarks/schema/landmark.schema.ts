import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LandmarkDocument = HydratedDocument<Landmark>;

@Schema({ timestamps: true, autoIndex: true })
export class Landmark {
    @Prop({})
    name: string;

    @Prop({})
    address: string;

    @Prop({ minlength: 7, maxlength: 10 })
    contact: number;

    @Prop({})
    geolocation: number[]

    @Prop({})
    tags: [string]

    @Prop({})
    image: string;

    @Prop({})
    cover: string;

    @Prop({})
    category: string;

    @Prop({ default: true })
    enabled: boolean;
}

export const LandmarkSchema = SchemaFactory.createForClass(Landmark);
