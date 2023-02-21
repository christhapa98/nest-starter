import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) { }

  getUsers(): object {
    return { user: 'user' };
  }
  userLogin(loginData: any): Promise<any> {
    return loginData;
  }
}
