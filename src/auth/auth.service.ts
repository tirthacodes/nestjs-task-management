import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dtos/auth-dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common/exceptions';
@Injectable()
export class AuthService {

// constructor( 
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
// ){}

// async signUp(authDto: AuthDto): Promise<void> {
//     return this.userRepository.signUp(authDto);
// }

    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ){}


    async signUp(authDto: AuthDto): Promise<void> {
        const {username, password } = authDto;

        const exists = this.repo.findOne({
            where: {
                username: username
            }
        });

        if(exists){
            //throw some error
        }

        const user = new User();
        user.username = username;
        user.password = password;

        try{
            await user.save();
        }catch(error){
            //console.log(error.code);
            if(error.code === 'ER_DUP_ENTRY'){ //duplicate username
                throw new ConflictException('Username already exist');
            }
            else{
                throw new InternalServerErrorException();
            }
           
        }

    }

}
