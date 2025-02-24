import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '../../../common/enums/role.enum';
import { Task } from '../../task/entity/task.entity';
import { Project } from '../../project/entities/project.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: '6e8f4e02-c91c-465f-b22d-7f102fca381b',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'user', description: 'Роль пользователя' })
  @Column({ unique: true })
  role: ROLE;

  @ApiProperty({ example: 'Вася', description: 'Имя пользователя' })
  @Column()
  name: string;

  @ApiProperty({ example: '1234567', description: 'Пароль' })
  @Column()
  password: string;

  @ApiProperty({ example: '22', description: 'Возраст пользователя' })
  @Column()
  age: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
