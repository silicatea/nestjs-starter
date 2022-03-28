import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash, hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Entity({name: 'DATABASE_NAME_HERE'})
export class Users{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10);
    }

    @BeforeInsert()
    generateUuid() {
        this.id = uuidv4().replace(/-/g, '');
    }
}