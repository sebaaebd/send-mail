import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFilesService } from '../services/uploadFiles.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  // se usa la función interceptor para revisar/manejar las imagenes
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    folder: string,
  ) {
    for (const file of files) {
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 });
      new FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' });
    }

    return await this.uploadFilesService.uploadFiles(files, folder);
  }
}
