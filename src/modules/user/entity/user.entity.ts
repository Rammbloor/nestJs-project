import {
    Column,
    CreateDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {ROLE} from '../../../common/enums/role.enum';
import {Task} from '../../task/entity/task.entity';


@Entity({name: 'users'})
export class User {
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({unique: true})
    email: string;

    @Column({unique: true})
    role: ROLE

    @ApiProperty({example: 'Вася', description: 'Имя пользователя'})
    @Column()
    name: string;

    @ApiProperty({example: '1234567', description: 'Пароль'})
    @Column()
    password: string;

    @ApiProperty({example: '22', description: 'Возраст пользователя'})
    @Column()
    age: number;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: "update_at"})
    updatedAt: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task []
}