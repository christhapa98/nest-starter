import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashPasswordInterceptor } from 'src/core/common/interceptors/hashpassword.interceptor';
import { emailNotFoundError, Go, passwordNotMatchedError } from 'src/core/common/response.common';
import { MailerService } from 'src/core/mailer/mailer';
import { CreateAdminDTO, LoginAdminDTO } from './dto/admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';
import { MailOption } from 'src/core/mailer/dto/mailer.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private admin: Model<AdminDocument>) { }

  async login(loginData: LoginAdminDTO): Promise<Admin> {
    let email = loginData.email;
    let admin = await this.admin.findOne({ email }, "-__v");
    if (admin) {
      const isValid: boolean = await new HashPasswordInterceptor().validate(
        admin.password,
        loginData.password,
      );
      if (isValid) return admin;
      throw passwordNotMatchedError()
    }
    throw emailNotFoundError(email);
  }

  async signup(signupFormData: CreateAdminDTO): Promise<Admin> {
    let email = signupFormData.email;
    let admin = await this.admin.findOne({ email });
    if (admin)
      throw new Go().error({
        message: `Admin with ${email} already exists`,
        status: HttpStatus.NOT_FOUND,
      });
    const createdAdmin = await this.admin.create(signupFormData);
    const mailer = new MailerService();
    const maileConfig: MailOption = {
      from: 'thapas58@gmail.com',
      html: '<p>this is a test</p>',
      subject: 'Signup Success',
      to: 'chris.thapa@riddhasoft.com',
    };
    mailer.sendMail(maileConfig);
    return createdAdmin;
  }

  async update(toUpdateData: any, id: any) { }
}
