import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from '../../user/entity/user.entity';
import {Project} from '../../project/entities/project.entity';
import {StatusTask} from '../../../common/enums/task-status.enum';
import {TaskSize} from '../../../common/enums/task-size.enum';
import {Comment} from '../../comment/entities/comment.entity';


@Entity({name: 'tasks'})
export class Task {

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id Автора задачи'})
    @Column({name: 'user_id'})
    userId: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id исполнителя задачи'})
    @Column({name: 'assignee_id', nullable: true})
    assigneeId: string | null

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id проекта'})
    @Column({name: 'project_id', nullable: true})
    projectId: string | null;

    @ApiProperty({example: 'Моя задача', description: 'Название задачи'})
    @Column()
    title: string;

    @ApiProperty({example: 'Нужно выполнить это', description: 'Описание задачи'})
    @Column()
    description: string;

    @Column({type: 'timestamp', nullable: true})
    deadline: Date | null

    @ApiProperty({example: 'OPEN', description: 'Задача открыта'})
    @Column({default: 'OPEN', name: 'status'})
    status: StatusTask

    @ApiProperty({example: 'S', description: 'Размер задачи'})
    @Column({default: 'S', name: 'size'})
    size: TaskSize

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL файла'})
    @Column({nullable: true, name: 'url_file'})
    urlFile: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: "update_at"})
    updatedAt: Date;

    @ManyToOne(() => Project, (project) => project.tasks, {nullable: true})
    @JoinColumn({name: 'project_id'})
    project?: Project;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => User, (user) => user.assignedTasks, {nullable: true})
    @JoinColumn({name: 'assignee_id'})
    assignee?: User

    @OneToMany(() => Comment, (comment) => comment.task)
    comments?: Comment []
}