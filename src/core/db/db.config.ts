import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export default class DBService {
  private readonly dbConnectionString: string =
    'mongodb://localhost:27017/nest';

  connect(): any {
    mongoose.set('strictQuery', true);
    return MongooseModule.forRoot(this.dbConnectionString);
  }

  close(): Promise<void> {
    return mongoose.disconnect();
  }
}
