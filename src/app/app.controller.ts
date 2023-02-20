import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/admin')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('get')
  admin(): any {
    return this.appService.getAdmin();
  }

  @Post('login')
  adminLogin(@Body() loginData: { email: string; password: string }): object {
    return this.appService.adminLogin(loginData);
  }

  /**
   * @param {any} 'signup'
   * @returns {any}
   */
  @Post('signup')
  adminSignup(@Body() loginData: { email: string; password: string }): any {
    return loginData;
  }
}
