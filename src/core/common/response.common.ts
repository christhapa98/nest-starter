import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class Go {
  constructor() { }

  error({ error, message, status }: { error?: any, message: string, status: any }): HttpException {
    throw new HttpException({ message, error, success: false }, status)
  }
  success(): any {
  }
}


