import { Test, TestingModule } from '@nestjs/testing';
import { CharacterFindOneService } from './character-find-one.service';

describe('FindOneService', () => {
  let service: CharacterFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterFindOneService],
    }).compile();

    service = module.get<CharacterFindOneService>(CharacterFindOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
