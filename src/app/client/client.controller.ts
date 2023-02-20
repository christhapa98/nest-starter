import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('client')
export class ClientController {
  constructor() {}

  @Get()
  getClients(): string {
    return '';
  }

  @Post()
  createOne(@Body() dto: any): Promise<any> {
    return dto;
  }
}
