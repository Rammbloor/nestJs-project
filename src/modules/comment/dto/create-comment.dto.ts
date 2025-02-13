import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

export class CreateCommentDto {

    @ApiProperty({example: 'Комментарий 1 к задаче', description: 'Пример комментария'})
    @IsString()
    @IsNotEmpty()
    text: string

    @ApiProperty({example:'6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id задачи'})
    @IsUUID()
    taskId: string

    @ApiProperty({example:'6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id родительского комментария'})
    @IsOptional()
    @IsUUID()
    parentCommentId?: string


}
