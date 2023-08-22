import { Controller, Post , Req,  Body, ValidationPipe, UseGuards} from '@nestjs/common';
import { AuthDto } from './dtos/auth-dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator';
import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('signup')
    signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<void>{
        return this.authService.signUp(authDto);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) authDto: AuthDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }

}
