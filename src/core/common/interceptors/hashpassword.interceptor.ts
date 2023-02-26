import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  /**
   * Intercept Api request and hash password
   * @date 2023-02-23
   * @param {any} context:ExecutionContext
   * @param {any} next:CallHandler
   * @returns {any}
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // Http Context with request.body 
    const { password } = context.switchToHttp().getRequest().body;
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      context.switchToHttp().getRequest().body.password = hashedPassword;
    }
    return next.handle();
  }

  /**
   * Validate Password 
   * @date 2023-02-23
   * @param {any} hashedPassword:string
   * @param {any} password:string
   * @returns {any}
   */
  async validate(hashedPassword: string, password: string): Promise<boolean> {
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    return passwordMatches;
  }
}
