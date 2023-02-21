import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('login')
    async userLogin() { }

    @Post('signup')
    async userSignup() { }

}
