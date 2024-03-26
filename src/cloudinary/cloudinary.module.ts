import { Module } from '@nestjs/common';
import { UploadFilesService } from './services/uploadFiles.service';
import { UploadFilesController } from './controllers/UploadFiles.controller';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { DeleteImageService } from './services/delete-image.service';

@Module({
  controllers: [UploadFilesController],
  providers: [UploadFilesService, CloudinaryProvider, DeleteImageService],
  exports: [UploadFilesService, DeleteImageService],
})
export class CloudinaryModule {}
