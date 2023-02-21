import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientLoginDTO, CreateClientDTO } from './dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor() { }

  @Get("all")
  getClients(): string {
    return '';
  }

  @Post("add")
  addClient(@Body() userData: CreateClientDTO): Promise<any> {
    console.log(userData);
    return null;
  }

  @Post("login")
  async login(@Body() clientLogin: ClientLoginDTO): Promise<ClientLoginDTO> {
    return clientLogin;
  }
}
