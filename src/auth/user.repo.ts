import { EntityRepository, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { AuthDto } from "./dtos/auth-dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authDto: AuthDto): Promise<void> {
        const {username, password } = authDto;
        const user = new User();
        user.username = username;
        user.password = password;

        await user.save();
    }
}