import { Injectable } from '@nestjs/common';
import { Admin } from 'src/data/schema/admin.schema';

@Injectable()
export class UserService {
  constructor() { };
  getUsers(): object {
    return { user: 'user' };
  }
  userLogin(loginData: any): Promise<Admin> {
    return loginData;
  }
}
