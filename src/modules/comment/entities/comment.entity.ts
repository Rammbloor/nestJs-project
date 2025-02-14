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
import {Task} from '../../task/entity/task.entity';
import {User} from '../../user/entity/user.entity';

@Entity()
export class Comment {

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id владельца комментария'})
    @Column({name: 'owner_id'})
    ownerId: string;


    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id задачи комментария'})
    @Column({name: 'task_id'})
    taskId: string;


    @ApiProperty({example: 'Комментарий 1 к задаче', description: 'Пример комментария'})
    @Column()
    text: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id родительского комментария'})
    @Column({name: 'parent_id', nullable: true})
    parentId: string | null

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: "update_at"})
    updatedAt: Date;

    @ManyToOne(() => Task, (task) => task.comments, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'task_id'})
    task: Task

    @ManyToOne(() => Comment, (comment) => comment.replies, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'parent_id'})
    parent?: Comment;

    @OneToMany(() => Comment, (comment) => comment.parent)
    replies: Comment[];

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: 'owner_id'})
    user: User
}
