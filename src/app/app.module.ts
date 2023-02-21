import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminModule } from './admin/admin.module';
import { ClientsModule } from './client/client.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ok'),
    AdminModule,
    ClientsModule,
    UsersModule],
})
export class AppModule { }
