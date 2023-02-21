import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class Go {
  constructor() { }

  error({ error, message }) {
  }
  success(): any { }
}
