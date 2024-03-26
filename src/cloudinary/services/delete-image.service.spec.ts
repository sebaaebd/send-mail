import { Test, TestingModule } from '@nestjs/testing';
import { DeleteImageService } from './delete-image.service';

describe('DeleteImageService', () => {
  let service: DeleteImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteImageService],
    }).compile();

    service = module.get<DeleteImageService>(DeleteImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
