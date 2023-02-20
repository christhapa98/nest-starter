import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import DBService from 'src/core/db/db.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/client.module';

@Module({
  imports: [ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  db = new DBService();

  /**
   * @returns {any}
   */
  startConnection = async (): Promise<void> => {
    mongoose.set('strictQuery', true);
    await this.db.connect();
  };
}
