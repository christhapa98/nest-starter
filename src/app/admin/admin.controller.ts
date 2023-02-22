import { Body, Controller, Post, Query, Res, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiNotFoundResponse, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDTO, LoginAdminDTO } from './dto/admin.dto';
import { HashPasswordInterceptor } from '../../core/common/interceptors/hashpassword.interceptor';
import { Admin } from './schema/admin.schema';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('login')
    @ApiOkResponse({ status: 201, description: "Admin Login Successfull" })
    @ApiNotFoundResponse({ status: 404, description: "Admin not found" })
    async adminLogin(@Res() res: any, @Body() loginData: LoginAdminDTO): Promise<Admin> {
        const admin: Admin = await this.adminService.login(loginData);
        return res.json({ success: true, data: admin, message: "Admin Login Successfull" });
    }

    @Post('signup')
    @UseInterceptors(HashPasswordInterceptor)
    async adminSignup(@Res() res: any, @Body() signupFormData: CreateAdminDTO): Promise<any> {
        const admin: Admin = await this.adminService.signup(signupFormData);
        return res.json({ success: true, data: admin, message: "Admin Created Successfull" });
    }

    @Post('update')
    @ApiQuery({ name: 'id' })
    async updateAdmin(@Query() query: any, @Body() toUpdateAdminData: any) {
        let id = query.id;
        // const updatedAdmin = (){ };132
        return id;
    }
}
