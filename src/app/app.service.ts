import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAdmin(): object {
    return { user: 'user' };
  }
  adminLogin(loginData: any): object {
    return loginData;
  }
}
