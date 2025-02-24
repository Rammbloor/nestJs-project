import { IsOptional, IsInt, Min, IsUUID, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPaginationDto {
  @ApiProperty({ example: 0, description: 'Номер страницы' })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiProperty({ example: 10, description: 'Количество комментариев' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  limit?: number;

  @ApiProperty({
    example: '6e8f4e02-c91c-465f-b22d-7f102fca381b',
    description: 'id родительского комментария',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
