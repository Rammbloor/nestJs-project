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
import {Project} from '../../project/entities/project.entity';


@Entity({name: 'tasks'})
export class Task {

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id Автора задачи'})
    @Column({name: 'user_id'})
    userId: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id проекта'})
    @Column({name: 'project_id',nullable: true })
    projectId: string;

    @ApiProperty({example: 'Моя задача', description: 'Название задачи'})
    @Column()
    title: string;

    @ApiProperty({example: 'Нужно выполнить это', description: 'Описание задачи'})
    @Column()
    description: string;

    @ApiProperty({example: 'false', description: 'Задача не выполнена'})
    @Column({default: false,name:'is_completed'})
    isCompleted: boolean;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL файла'})
    @Column({ nullable: true,name:'url_file' })
    urlFile: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: "update_at"})
    updatedAt: Date;

    @ManyToOne(() => Project, (project) => project.tasks, { nullable: true })
    @JoinColumn({ name: 'project_id' })
    project?: Project;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({name:'user_id'})
    user: User
}