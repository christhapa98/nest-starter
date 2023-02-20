import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Admin } from 'src/data/schema/admin.schema';
import { AppService } from './app.service';

interface LoginFormData { email: string; password: string };
interface SignupFormData { email: string; password: string, name: string, contact: string };

@Controller('/admin')
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get('get')
  admin(): any {
    return this.appService.getAdmin();
  }

  @Post('login')
  adminLogin(@Body() loginData: LoginFormData): object {
    return this.appService.adminLogin(loginData);
  }


  @Post('signup')
  adminSignup(@Res() response, @Body() signupFormData: SignupFormData): Admin {
    console.log(response);
    return new Admin();
  }
}
