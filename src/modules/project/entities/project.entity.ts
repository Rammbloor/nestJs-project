import {ApiProperty} from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {User} from '../../user/entity/user.entity';
import {Task} from '../../task/entity/task.entity';


@Entity('project')
export class Project {

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id владельца проекта'})
    @Column({name: 'owner_id'})
    ownerId: string;

    @ApiProperty({example: 'Мой проект', description: 'Название проекта'})
    @Column()
    title: string;

    @ApiProperty({example: 'Это проект', description: 'Описание проекта'})
    @Column()
    description: string;

    @ApiProperty({example: '1000', description: 'Стоимость проекта'})
    @Column()
    price: number;

    @ApiProperty({example: 'false', description: 'Проект не выполнен'})
    @Column({default: false,name:'is_completed'})
    isCompleted: boolean;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL Файла'})
    @Column({ nullable: true,name:'url_file' })
    urlFile: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: "update_at"})
    updatedAt: Date;


    @OneToMany(() => Task, (task) => task.project)
    tasks: Task []

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({name:'owner_id'})
    user: User

}


