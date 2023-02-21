import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAdminDTO } from './dto/admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private admin: Model<AdminDocument>) { }

  async getAdminByEmail(email: string): Promise<Admin> {
    let user = await this.admin.findOne({ email })
    if (!user) throw new NotFoundException(`Admin with ${email} not found`);
    else return user;
  }

  async login(loginData: LoginAdminDTO): Promise<any> {
    const user: Admin = await this.getAdminByEmail(loginData.email);
    if (user) {
      //check password//
    }
  }
}
