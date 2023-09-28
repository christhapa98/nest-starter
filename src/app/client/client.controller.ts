import { Body, Controller, Get, Post, Delete, Query, Res, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { HashPasswordInterceptor } from 'src/core/common/interceptors/hashpassword.interceptor';
import { ClientService } from './client.service';
import { ClientLoginDTO, CreateClientDTO, ForgetPasswordDTO, ForgetPasswordResponseDTO, ResetPasswordDTO } from './dto/client.dto';
import { Client } from './schema/client.schema';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get('all')
  async getClients(@Res() res: any,): Promise<any> {
    const clients: Client[] = await this.clientService.getAll();
    return res.json({
      success: true,
      data: clients,
      message: 'All Clients'
    });
  }

  @Post('add')
  @UseInterceptors(HashPasswordInterceptor)
  async addClient(@Res() res: any, @Body() userData: CreateClientDTO): Promise<any> {
    const client: Client = await this.clientService.signup(userData);
    return res.json({
      success: true,
      data: client,
      message: 'Client Created Successfull',
    });
  }

  @Post('login')
  async login(@Res() res: any, @Body() clientLogin: ClientLoginDTO): Promise<any> {
    const client: Client = await this.clientService.login(clientLogin);
    return res.json({
      success: true,
      data: client,
      message: 'Client Login Successfull',
    });
  }

  @Get('')
  @ApiQuery({ name: 'id' })
  async getClientById(@Query() query: any) {
    let id: string = query.id;
    const client: Client = await this.clientService.findById(id)
    return client;
  }

  @Delete('')
  @ApiQuery({ name: 'id' })
  async deleteClientById(@Query() query: any) {
    let id: string = query.id;
    const deleted: boolean = await this.clientService.deleteById(id)
    return { success: true, data: true, message: "Client Deleted Successfully" };
  }

  @Post('forgetpassword')
  async forgetPassword(@Res() res: any, @Body() body: ForgetPasswordDTO) {
    let email = body.email;
    const forgerPasswordResponse: ForgetPasswordResponseDTO = await this.clientService.forgetPassword(email)
    res.json({ success: true, message: "Otp sent successfully", data: forgerPasswordResponse })
  }

  @Post('resetpassword')
  async resetPassword(@Res() res: any, @Body() body: ResetPasswordDTO) {
    const resetPassword: boolean = await this.clientService.resetPassword(body)
    res.json({ success: true, message: "Password reset successfully", data: resetPassword })
  }
}
