import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/app/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector, private usersService: UsersService){
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(roles)
    if (!roles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    console.log(context.switchToHttp().getRequest());
	//return roles.some((role) => user.roles?.includes(role));
    //const test = this.usersService.findOneOrFail({});
    }
}

/**
 * por enquanto isso não faz nada além de deixar as requisições passarem
 */