import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  getUsers(): object {
    return { user: 'user' };
  }
  userLogin(loginData: any): object {
    return loginData;
  }
}
