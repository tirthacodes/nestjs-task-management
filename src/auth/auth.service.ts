import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dtos/auth-dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload/jwt-payload.interface';

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
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService,
    ){}


    async signUp(authDto: AuthDto): Promise<void> {
        const {username, password } = authDto;

        // const exists = this.repo.findOne({
        //     where: {
        //         username: username
        //     }
        // });

        // if(exists){
        //     throw some error
        // }

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try{
           await user.save();
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY'){ //duplicate username
                throw new ConflictException('Username already exist');
            }
            else{
                throw new InternalServerErrorException();
            }
           
        }

    }

    private async hashPassword(password: string, salt: string){
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authDto: AuthDto) : Promise<string>{
        const {username, password } = authDto;
        const user = await this.repo.findOne({
            where:{
                username: username,
            }
        });

        if(user && await user.validatePassword(password)){
            return user.username;
        }
        else{
            return null;
        }
    }

    async signIn(authDto: AuthDto) : Promise<{ accessToken: string}> {
        const username = await this.validateUserPassword(authDto);

        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }

}
