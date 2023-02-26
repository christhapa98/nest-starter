import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBURL } from 'env';

import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ClientsModule } from './client/client.module';
import { LandmarkModule } from './landmarks/landmark.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(DBURL),
    AdminModule,
    ClientsModule,
    UsersModule,
    CategoryModule,
    LandmarkModule
  ],
})
export class AppModule { }
