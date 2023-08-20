import { Controller, Post , Body, ValidationPipe} from '@nestjs/common';
import { AuthDto } from './dtos/auth-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('signup')
    signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<void>{
        console.log(authDto);
        return this.authService.signUp(authDto);
    }

}
