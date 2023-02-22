import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashPasswordInterceptor } from 'src/core/common/interceptors/hashpassword.interceptor';
import { Go } from 'src/core/common/response.common';
import { CreateAdminDTO, LoginAdminDTO } from './dto/admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private admin: Model<AdminDocument>) { }

  async login(loginData: LoginAdminDTO): Promise<any> {
    let email = loginData.email;
    let admin = await this.admin.findOne({ email });
    if (admin) {
      const isValid: boolean = await new HashPasswordInterceptor().validate(admin.password, loginData.password)
      if (isValid) return admin;
      throw new Go().error({ message: `Password doesnot matched`, status: HttpStatus.FORBIDDEN });
    }
    throw new Go().error({ message: `Admin with ${email} not found`, status: HttpStatus.NOT_FOUND });
  }

  async signup(signupFormData: CreateAdminDTO) {
    let email = signupFormData.email;
    let admin = await this.admin.findOne({ email })
    if (admin) throw new Go().error({ message: `Admin with ${email} already exists`, status: HttpStatus.NOT_FOUND });
    const createdAdmin = await this.admin.create(signupFormData);
    return createdAdmin;
  }

  async update(toUpdateData: any, id: any) {

  }
}
