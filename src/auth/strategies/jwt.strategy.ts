import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //faz ele pegar o token do header no POST
            ignoreExpiration: false, //deixar o token infinito nao e uma boa ideia geralmente
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: any){
        return { id: payload.sub, email: payload.email, name: payload.name } //a validacao de verdade ocorre no constructor, aqui e so isso mesmo
    }
}