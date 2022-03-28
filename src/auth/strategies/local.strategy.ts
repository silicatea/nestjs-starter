import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { MessageHelper } from "src/helpers/messages.helper";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({usernameField: 'email'}) //o padrao e username, mas como estamos utilizando email, isso subscreve o campo
    }

    async validate(email: string, password: string){
        const user = await this.authService.validateUser(email, password); //Procura o usuario

        if(!user) throw new UnauthorizedException(MessageHelper.INVALID_CREDENTIALS); //se estiver incorreto, mostrar mensagem de erro

        return user; //se estiver certinho, retorna o usuario
    }
}