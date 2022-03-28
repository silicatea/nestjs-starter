import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt')) //ver useGlobalGuards depois
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async index() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string){
        return await this.usersService.findOneOrFail({id});
    }

    @Post()
    //@hasRoles('admin')
    async store(@Body() body: CreateUserDto) {
        return await this.usersService.store(body);
    }

    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.usersService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.usersService.destroy(id);
    }
}
