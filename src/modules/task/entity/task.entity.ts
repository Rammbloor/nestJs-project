import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from '../../user/entity/user.entity';


@Entity({name: 'tasks'})
export class Task {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: 'id Автора задачи'})
    @Column({name: 'user_id'})
    userId: number;


    @ApiProperty({example: 'Моя задача', description: 'Название задачи'})
    @Column()
    title: string;

    @ApiProperty({example: 'Нужно выполнить это', description: 'Описание задачи'})
    @Column()
    description: string;

    @ApiProperty({example: 'false', description: 'Задача не выполнена'})
    @Column({default: false,name:'is_completed'})
    isCompleted: boolean;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL фотографии'})
    @Column({ nullable: true,name:'url_photo' })
    urlPhoto: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: "update_at"})
    updatedAt: Date;


    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({name:'user_id'})
    user: User
}