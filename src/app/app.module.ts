import { Module } from '@nestjs/common';
import DBService from 'src/core/db/db.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/client.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ClientsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public db: DBService = new DBService();

  startDbConnection = async (): Promise<void> => {
    try {
      await this.db.connect();
      console.log("DB Connected Successfully")
    } catch (error) { console.log(error) }
  };

  closeConnection = async (): Promise<void> => {
    try {
      await this.db.close();
      console.log("DB Disconnected Successfully")
    } catch (error) { console.log(error) }
  }
}
