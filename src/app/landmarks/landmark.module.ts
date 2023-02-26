import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandmarkController } from './landmark.controller';
import { LandmarkService } from './landmark.service';
import { LandmarkSchema } from './schema/landmark.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Landmark", schema: LandmarkSchema }]),
    ],
    controllers: [LandmarkController],
    providers: [LandmarkService],
})
export class LandmarkModule { }
