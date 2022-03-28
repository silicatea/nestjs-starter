import { SetMetadata } from "@nestjs/common";

//isso nos faz evitar ficar declarando rotas nos controllers
export const hasRoles = (...hasRoles: string[]) => SetMetadata('roles', hasRoles); 