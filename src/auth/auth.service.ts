import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dtos/auth-dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {

// constructor( 
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
// ){}

// async signUp(authDto: AuthDto): Promise<void> {
//     return this.userRepository.signUp(authDto);
// }



    async signUp(authDto: AuthDto): Promise<void> {
        const {username, password } = authDto;
        const user = new User();
        user.username = username;
        user.password = password;

        await user.save();
    }

}
