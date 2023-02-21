import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiNotFoundResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDTO, LoginAdminDTO } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('login')
    @ApiOkResponse({ status: 201, description: "Admin Login Successfull" })
    @ApiNotFoundResponse({ status: 404, description: "Admin not found" })
    async adminLogin(@Res() res: any, @Body() loginData: LoginAdminDTO): Promise<any> {
        const admin: Admin = await this.adminService.getAdminByEmail(loginData.email);
        return res.json({ success: true, data: admin, message: "Admin Login Successfull" });
    }

    @Post('signup')
    async adminSignup(@Body() signupFormData: CreateAdminDTO): Promise<any> {

    }
}
