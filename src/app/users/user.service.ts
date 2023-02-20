import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): object {
    return { user: 'user' };
  }
  userLogin(loginData: any): object {
    return loginData;
  }
}
