import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/messages.helper";
import { RegexHelper } from "src/helpers/regex.helpers";
import { Users } from "../entities/users.entity";

export class CreateUserDto extends Users{

    @IsNotEmpty()
    name: string;
    
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegexHelper.password, {message: MessageHelper.PASSWORD_VALID})
    password: string;
}