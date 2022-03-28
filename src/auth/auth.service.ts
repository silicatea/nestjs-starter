import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity'
import { compareSync } from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

    async login(user: any){
        const payload = { sub: user.id, email: user.email, name: user.name}; //o padrao do jwt e sempre deixar o id como 'sub' - montando requisicao
        /**
         * nao envie dados sensiveis aqui
         */
        return{
            token: this.jwtService.sign(payload) //gerando token - ja passamos as configs no auth.module
        }
    }

    async validateUser(email: string, password: string){
        let user: Users; //define o tipo do usuario

        try{
            user = await this.userService.findOneOrFail({email}); //busca o email
        }
        catch(e){
            return null; //como ja estamos retornando a mensagem na validacao, e melhor deixar isso nulo, assim enviando apenas um erro
        }
        
        const isPasswordValid = compareSync(password, user.password); //compara a senha enviada com o a hash do banco(a user.password)
        
        if(!isPasswordValid) return null; //retorna nulo tambem(ver try/catch)
        return user; //deu tudo certo -> retorna o usuario
    }
}
