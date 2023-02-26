import { Body, Controller, Post, Query, Res, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiNotFoundResponse, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDTO, LoginAdminDTO } from './dto/admin.dto';
import { HashPasswordInterceptor } from '../../core/common/interceptors/hashpassword.interceptor';
import { Admin } from './schema/admin.schema';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  @ApiOkResponse({ status: 201, description: 'Admin Login Successfull' })
  @ApiNotFoundResponse({ status: 404, description: 'Admin not found' })
  async adminLogin(
    @Body() loginData: LoginAdminDTO,
  ): Promise<Admin> {
    const admin: Admin = await this.adminService.login(loginData);
    return admin
  }

  @Post('signup')
  @UseInterceptors(HashPasswordInterceptor)
  async adminSignup(
    @Body() signupFormData: CreateAdminDTO,
  ): Promise<any> {
    const admin: Admin = await this.adminService.signup(signupFormData);
    return admin
  }

  @Post('update')
  @ApiQuery({ name: 'id' })
  async updateAdmin(@Query() query: any, @Body() toUpdateAdminData: any) {
    let id = query.id;
    return id;
  }
}
