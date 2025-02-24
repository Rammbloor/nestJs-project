import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from '../task/entity/task.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Загрузка файла' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл для загрузки',
    type: 'multipart/form-data',
    required: true,
    schema: { type: 'object', properties: { file: {} } },
  })
  @ApiResponse({ status: 200, description: 'Файл загружен', type: Task })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  public async uploadFileToB2(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFileToB2(file);
  }
}
