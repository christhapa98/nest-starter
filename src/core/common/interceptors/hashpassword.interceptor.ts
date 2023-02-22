import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const { password } = context.switchToHttp().getRequest().body;
        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            context.switchToHttp().getRequest().body.password = hashedPassword;
        }
        return next.handle();
    }

    async validate(hashedPassword: string, password: string): Promise<boolean> {
        const passwordMatches = await bcrypt.compare(password, hashedPassword);
        return passwordMatches;
    }
}
