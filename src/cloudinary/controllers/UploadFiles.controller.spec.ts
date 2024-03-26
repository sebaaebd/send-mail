import { Test, TestingModule } from '@nestjs/testing';
import { UploadFilesController } from './UploadFiles.controller';
import { UploadFilesService } from '../services/uploadFiles.service';

describe('CloudinaryController', () => {
  let controller: UploadFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadFilesController],
      providers: [UploadFilesService],
    }).compile();

    controller = module.get<UploadFilesController>(UploadFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
