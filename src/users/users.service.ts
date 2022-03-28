import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ){}

    async findAll() {
        return await this.usersRepository.find({select: ['id', 'name', 'surname', 'email']}); //evitando retornar a senha junto com os dados
    }

    async findOneOrFail(conditions: FindConditions<Users>, options?: FindOneOptions<Users>) {
        try{
            return await this.usersRepository.findOneOrFail(conditions, options); //tenta encontrar qualquer coisa que estiver no banco(isso evita criar varios metodos)
        }
        catch(e){
            throw new NotFoundException(e.message);
        }
        
    }

    async store(data: CreateUserDto){
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user)
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneOrFail({id}); //busca usuario
        this.usersRepository.merge(user, data); //atualiza os dados
        return await this.usersRepository.save(user); //salva no banco
    }
    async destroy(id: string) {
        await this.usersRepository.findOneOrFail({id}); //busca usuario
        this.usersRepository.delete({id}); //deleta do banco
    }

}
