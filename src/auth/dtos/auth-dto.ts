import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}