import { Test, TestingModule } from '@nestjs/testing';
import { UploadFilesService } from './uploadFiles.service';

describe('CloudinaryService', () => {
  let service: UploadFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadFilesService],
    }).compile();

    service = module.get<UploadFilesService>(UploadFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
